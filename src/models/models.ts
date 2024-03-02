import { userSchema } from "../schemas/mongooseSchemas";
import mongoose from "mongoose";

export const User = mongoose.model("User", userSchema);
