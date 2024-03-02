import Jwt from "jsonwebtoken";
import { Request } from "express";
export interface IRequestWithUser extends Request {
	user?: Jwt.JwtPayload;
}
