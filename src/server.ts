import express from "express";
import dotenv from "dotenv";
import https from "https";
import cors from "cors";
import { readFileSync } from "fs";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const sslKey: string = process.env.SSL_KEY || "";
const sslCert: string = process.env.SSL_CERT || "";
const options = {
	key: readFileSync(sslKey),
	cert: readFileSync(sslCert),
};
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.set("trust proxy", 1);

const server = https.createServer(options, app);

const startServer = () => {
	try {
		server.listen(port);
	} catch (error) {
		console.error("Error staring server: ", error);
	}
};
startServer();
