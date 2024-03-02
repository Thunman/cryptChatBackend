import express from "express";
import userController from "../controllers/userController";
import { rateLimiter } from "../middleware/ratelimiter";
import { auth } from "../middleware/authentication";

export const userRouter = express.Router();

userRouter.post("/register", rateLimiter, userController.register);
userRouter.post("/login", rateLimiter, userController.login);
userRouter.get(
	"/getConversations",
	rateLimiter,
	auth,
	userController.getConversations
);
userRouter.post("/sendMessage", rateLimiter, auth, userController.sendMessage);
