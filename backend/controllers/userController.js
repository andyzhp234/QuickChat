// import User from "../db/models/user.js";
import { User } from "../db/models/index.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

// an api endpoint that checks if an user is authroized
const loginUser = async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  try {
    const user = await User.findOne({
      where: { email: email },
    });

    // if user account have not been registered
    if (user == null) {
      return res
        .status(400)
        .send({ message: "The user name or password is incorrect" });
    }

    // If registered and have correct password
    if (await bcrypt.compare(password, user.password)) {
      const csrfToken = uuidv4();
      req.session.userId = user.id;
      req.session.userEmail = user.email;
      req.session.username = user.username;
      req.session.csrfToken = csrfToken;
      req.session.isAuthenticated = true;
      res.status(200).json({ csrfToken });
    } else {
      return res
        .status(400)
        .send({ message: "The user name or password is incorrect" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error. Please try again later" });
  }
};

const registerUser = async (req, res) => {
  let { email, password, username } = req.body;
  email = email.toLowerCase();

  try {
    // we need to check if this email already used
    const emailExists = await User.findOne({
      where: { email: email },
    });

    if (emailExists != null) {
      return res.status(409).send({ message: "E-mail already in Used" });
    }

    // we also need to check if this username has been used
    const usernameExists = await User.findOne({
      where: { username: username },
    });

    if (usernameExists != null) {
      return res.status(409).send({ message: "Username already in Used" });
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user informations
    const user = await User.create({
      username,
      email,
      password: encryptedPassword,
    });

    const csrfToken = uuidv4();
    req.session.userId = user.id;
    req.session.userEmail = user.email;
    req.session.username = user.username;
    req.session.csrfToken = csrfToken;
    req.session.isAuthenticated = true;
    res.status(201).json({ csrfToken });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error. Please try again later" });
  }
};

const checkUserSession = async (req, res) => {
  console.log(req.session.isAuthenticated);
  if (req.session.isAuthenticated) {
    res.status(200).send({ message: "Authorized" });
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

const userLogout = async (req, res) => {
  // destroy the session & cookies
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Error logging out" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
};

export { loginUser, registerUser, checkUserSession, userLogout };
