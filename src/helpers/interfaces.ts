import Jwt from "jsonwebtoken";
import { Request } from "express";
export interface AuthenticatedRequest extends Request {
	user?: Jwt.JwtPayload;
}
