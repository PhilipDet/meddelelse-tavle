import express from "express";
import { eventModel } from "../models/eventModel.js";

export const indexController = express.Router();

indexController.get("/", async (req, res) => {
    const events = await eventModel.getAllEvents();
    events.forEach((event) => {
        event.isInDateRange = checkIfInDateRange(event);
        console.log(event);
    });

    res.render("index", {
        title: "Events",
        message: "Her bliver alle events vist..",
        events: events,
    });
});

function checkIfInDateRange(event) {
    const now = new Date();
    const start_date = new Date(event.start_date);
    const end_date = new Date(event.end_date);
    return now >= start_date && now <= end_date;
}
