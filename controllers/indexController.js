import express from "express";

export const indexController = express.Router();

indexController.get("/", async (req, res) => {
    res.render("index", {
        title: "Meddelelser",
        env: process.env,
    });
});

indexController.get("/config", async (req, res) => {
    res.json({
        env: process.env,
    });
});
