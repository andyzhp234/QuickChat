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

app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "https://quickchat-app.netlify.app"],
    credentials: true,
  })
);

app.use(helmet());

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
  console.log(`Server Running on port ${PORT}`);
});

export { redisClient };
