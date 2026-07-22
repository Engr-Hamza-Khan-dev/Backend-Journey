import express from "express";
import dotenv from "dotenv";
dotenv.config();

import EmailController from "./controllers/email.controller.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/send-email", EmailController);

export default app;
