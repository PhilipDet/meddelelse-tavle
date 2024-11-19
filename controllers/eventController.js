import express from "express";
import multer from "multer";
import path from "path";

export const eventController = express.Router();

eventController.use(express.urlencoded({ extended: true }));

eventController.get("/create-event", (req, res) => {
    res.render("createEvent", {
        title: "Opret event",
        message: "Opret dit event her!",
    });
});

import { eventModel } from "../models/eventModel.js";

const upload = multer({ storage: multer.memoryStorage() });

eventController.post(
    "/event-created",
    upload.single("image"),
    async (req, res) => {
        const { title, description, start_date, end_date } = req.body;

        const image = req.file;

        if (image) {
            const imageBuffer = image.buffer;
            const imageName = `${Date.now()}-${image.originalname}`;
            const mimeType = image.mimetype;

            const uploadedImage = await eventModel.uploadImage(
                imageName,
                imageBuffer,
                mimeType
            );
            console.log("Image uploaded to Supabase:", uploadedImage);
        }

        const eventData = eventModel.createEvent({
            title,
            description,
            start_date,
            end_date,
            image: image ? `${Date.now()}-${image.originalname}` : null,
        });

        res.json(eventData);
    }
);
