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
export const messageSchema = new mongoose.Schema({
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
});
export const conversationsSchema = new mongoose.Schema({
	participants: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	messages: [messageSchema],
});
