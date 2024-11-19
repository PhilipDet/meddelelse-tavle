import express from "express";
import { eventModel } from "../models/eventModel.js";

export const indexController = express.Router();

indexController.get("/", async (req, res) => {
    const events = await eventModel.getAllEvents();
    events.forEach(async (event) => {
        event.isInDateRange = checkIfInDateRange(event);
        if (!event.isInDateRange) {
            const hasPassed = checkIfDateHasPassed(event.end_date);
            if (hasPassed) {
                const removeEvent = await eventModel.removeEvent(event.id);
                console.log(removeEvent);
            }
        }
    });

    res.render("index", {
        title: "Meddelelser",
        events: events,
    });
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
