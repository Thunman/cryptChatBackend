import { validationResult } from "express-validator";
import { loginValidators, registerValidators } from "../middleware/validators";
import { Request, Response } from "express";
import { Conversation, Message, User } from "../models/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../helpers/interfaces";

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
				await newUser.save();
				res.status(201).json({ message: "User Created" });
			} catch (error) {
				console.error(error);
				res.status(500).json({ message: "Server Error" });
			}
		},
	],
	login: [
		...loginValidators,
		async (req: Request, res: Response) => {
			try {
				const { email, password } = req.body;
				const user = await User.findOne({ email });
				if (!user || (await bcrypt.compare(password, user.password)))
					return res
						.status(401)
						.json({ message: "Invalid Email or Password" });
				const token = jwt.sign(
					{
						id: user._id,
						email: user.email,
					},
					process.env.JWT_SECRET
				);
				res.cookie("token", token, {
					httpOnly: true,
					secure: true,
					sameSite: "none",
				});
				res.status(200);
			} catch (error) {
				console.error(error);
				res.status(500).json({ message: "Server Error" });
			}
		},
	],
	getConversations: async (req: AuthenticatedRequest, res: Response) => {
		const uid = req.user._id;
		const user = await User.findById(uid);
		if (!user) return res.status(404).json({ message: "User not found" });
		const conversations = await Conversation.find({
			_id: { $in: user.conversations },
		});
		return conversations;
	},
	sendMessage: async (req: AuthenticatedRequest, res: Response) => {
		try {
			const { conversationId, text } = req.body;
			const conversation = await Conversation.findById(conversationId);
			if (!conversation) {
				return res.status(404).json({ message: "Conversation not found" });
			}
			const message = new Message({
				sender: req.user._id,
				text: text,
				timestamp: new Date(),
			});
			conversation.messages.push(message);
			await conversation.save();
			return res.json(message);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: "Internal server error" });
		}
	},
};
export default userController;
