import express from "express";

export const eventController = express.Router();

eventController.get("/createEvent", (req, res) => {
    res.render("createEvent", {
        title: "Opret event",
        message: "Opret dit event her!",
    });
});
