import express from "express";
import userController from "../controllers/userController";
import { rateLimiter } from "../middleware/ratelimiter";

export const userRouter = express.Router();

userRouter.post("/register", rateLimiter, userController.register);
userRouter.post("/login", rateLimiter, userController.login);
