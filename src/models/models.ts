import { conversationsSchema, userSchema } from "../schemas/mongooseSchemas";
import mongoose from "mongoose";

export const User = mongoose.model("User", userSchema);
export const Conversation = mongoose.model(
	"Conversations",
	conversationsSchema
);
