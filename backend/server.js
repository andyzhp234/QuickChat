import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";
import pkg from "connect-redis";
import { createClient } from "redis";
import { connectDB } from "./db/index.js";
import http from "http";
import registerSocketServer from "./socketServer.js";
import authRoutes from "./routers/authRoutes.js";
import MessageRoutes from "./routers/messageRoutes.js";

const app = express();

const allowedOrigins = [
  "http://127.0.0.1:5173",
  "https://quickchat-app.netlify.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
// handle Cors Error
app.use((err, req, res, next) => {
  if (err instanceof Error && err.message === "Not allowed by CORS") {
    res.status(403).json({ error: "CORS not allowed" });
  } else {
    next();
  }
});

app.use(helmet());

app.use((req, res, next) => {
  if (
    process.env.MODE === "production" &&
    !req.secure &&
    req.headers["x-forwarded-proto"] !== "https"
  ) {
    console.log("forwarding http to https");
    return res.redirect("https://" + req.headers.host + req.url);
  } else {
    console.log(req.secure);
    console.log(req.protocol);
    return next();
  }
});

// connect and test to PostgreSQL
connectDB();

// connect to Redis
const RedisStore = pkg(session);
const redisClient = createClient({
  url: process.env.RD_URL,
  legacyMode: true,
});

redisClient
  .connect()
  .then(console.log("Redis Server Connected"))
  .catch(console.error);

// In production, the cookie will have property: Secure: true, samesite: none (for CORS), httpOnly (XSS attack)
const sessionMiddleware = session({
  store: new RedisStore({
    client: redisClient,
    ttl: parseInt(process.env.RD_LIFETIME),
  }),
  secret: process.env.RDSECRET, // sign the session ID cookie
  resave: false, // whether the session should be saved to the session store on every request
  saveUninitialized: false,
  cookie: {
    maxAge: parseInt(process.env.CK_LIFETIME), // 1 day * 24hr * 60 min * 60 sec
    sameSite: process.env.MODE === "production" ? "none" : "lax",
    secure: process.env.MODE === "production", // only accept if HTTPS in production
    httpOnly: true,
  },
});

app.use(sessionMiddleware);

// request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing
app.use("/api/auth", authRoutes);
app.use("/api/messages", MessageRoutes);

const server = http.createServer(app);
registerSocketServer(server, sessionMiddleware);

// server listen to the Port
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`HTTP Server Running on port ${PORT}`);
});

export { redisClient };
