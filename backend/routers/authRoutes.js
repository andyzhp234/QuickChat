import express from "express";
import Joi from "joi";
import {
  loginUser,
  registerUser,
  checkUserSession,
  userLogout,
} from "../controllers/userController.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import rateLimiter from "../middlewares/rateLimiter.js";

const router = express.Router();

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});

router.get("/checkAuth", checkUserSession);
router.post(
  "/register",
  // rateLimiter,
  schemaValidator(registerSchema),
  registerUser
);
router.post("/login", rateLimiter(), schemaValidator(loginSchema), loginUser);
router.post("/logout", userLogout);

export default router;
