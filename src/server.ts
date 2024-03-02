import express from "express";
import dotenv from "dotenv";
import https from "https";
import cors from "cors";
import { readFileSync } from "fs";
import { userRouter } from "./routers/userRouter";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const mongoUrl = process.env.MONGO_URL || "";
const port = process.env.PORT || 3001;
const sslKey = process.env.SSL_KEY || "";
const sslCert = process.env.SSL_CERT || "";
const options = {
	key: readFileSync(sslKey),
	cert: readFileSync(sslCert),
};
app.use(express.json());
app.use("/api/users", userRouter);
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.set("trust proxy", 1);

const server = https.createServer(options, app);

const startServer = async () => {
	try {
		server.listen(port);
		await mongoose.connect(mongoUrl);
	} catch (error) {
		console.error("Error staring server: ", error);
	}
};
startServer();
