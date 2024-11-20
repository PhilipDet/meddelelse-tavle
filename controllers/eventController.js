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
            image.name = `${Date.now()}-${image.originalname}`;

            const uploadedImage = await eventModel.uploadImage(
                image.name,
                image.buffer,
                image.mimetype
            );
            console.log("Image uploaded to Supabase:", uploadedImage);
        }

        const eventData = eventModel.createEvent({
            title,
            description,
            start_date,
            end_date,
            image: image ? image.name : null,
        });

        res.json(eventData);
    }
);
