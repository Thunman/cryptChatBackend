import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	conversations: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Conversation" }],
		default: [],
	},
	hasNewMessages: {
		type: Boolean,
		default: false,
	},
});

export const conversationsSchema = new mongoose.Schema({
	participants: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	messages: [
		{
			sender: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
			text: {
				type: String,
				required: true,
			},
			timestamp: {
				type: Date,
				default: Date.now,
			},
		},
	],
});
