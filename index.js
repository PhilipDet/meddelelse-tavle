import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const env = process.env;

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use(express.static(path.join(__dirname, "public")));

import { indexController } from "./controllers/indexController.js";
app.use(indexController);

import { eventController } from "./controllers/eventController.js";
app.use(eventController);

app.listen(env.PORT, () => {
    console.log(`Express server kører på http://localhost:${env.PORT}`);
});
