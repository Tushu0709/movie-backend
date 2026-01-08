import express from "express";
import { register, login } from "../controller/authController.js";
import { check } from "express-validator";

const authRouter = express.Router();

authRouter.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
  ],
  register
);

authRouter.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  login
);

export default authRouter;
