import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const rateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	handler: (req: Request, res: Response) => {
		res.status(429).json({ message: "To many requests, try again later" });
	},
});
