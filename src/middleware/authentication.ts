import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../helpers/interfaces";
export const auth = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	const token = req.cookies.token;
	if (!token) return res.status(401).json({ message: "No token provided" });
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (typeof decoded === "object") {
			req.user = decoded as jwt.JwtPayload;
			next();
		} else {
			throw new Error("Invalid token");
		}
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: "Invalid Token" });
	}
};
