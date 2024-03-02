import { validationResult } from "express-validator";
import { registerValidators } from "../middleware/validators";
import { Request, Response } from "express";
import { User } from "../models/models";
import bcrypt from "bcrypt";

const userController = {
	register: [
		...registerValidators,
		async (req: Request, res: Response) => {
			const errors = validationResult(req);
			if (!errors.isEmpty())
				return res.status(400).json({ message: errors.array() });
			try {
				const { userName, email, password } = req.body;
				const userExists = await User.findOne({ email });
				if (userExists)
					return res
						.status(400)
						.json({ message: "User with that email already exists" });
				const hashedPassword = await bcrypt.hash(password, 10);
				const newUser = new User({
					userName,
					email,
					password: hashedPassword,
				});
			} catch (error) {
				console.error(error);
			}
		},
	],
};
