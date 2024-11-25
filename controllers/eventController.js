import express from "express";
import multer from "multer";

export const eventController = express.Router();

eventController.use(express.urlencoded({ extended: true }));

eventController.get("/create-event", (req, res) => {
    res.render("createEvent", {
        title: "Opret event",
        message: "Opret dit event her!",
    });
});

import { eventModel } from "../models/eventModel.js";

eventController.get("/api/events", async (req, res) => {
    try {
        const events = await eventModel.getAllEvents();
        const validEvents = [];

        events.forEach(async (event) => {
            event.isInDateRange = checkIfInDateRange(event);

            if (event.isInDateRange) {
                validEvents.push(event);
            } else {
                const hasPassed = checkIfDateHasPassed(event.end_date);
                if (hasPassed) {
                    await eventModel.removeEvent(event.uuid);
                    console.log("Removed event: ", event.uuid);
                }
            }
        });

        res.json(validEvents);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json("Error: ", error);
    }
});

function checkIfInDateRange(event) {
    const now = new Date();
    const start_date = new Date(event.start_date);
    const end_date = new Date(event.end_date);
    return now >= start_date && now <= end_date;
}

function checkIfDateHasPassed(date) {
    const now = new Date();
    const dateToCheck = new Date(date);
    return now > dateToCheck;
}

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
