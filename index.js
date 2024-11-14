import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const env = process.env;

app.use(express.static("public"));

app.get("/", (req, res) => {
    let html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Forside</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>

        <script src="/js/script.js" defer></script>
        <body>
            <img src="" />
            <h1>Her vil der komme meddelelser..</h1>
        </body>
        </html>
    `;

    res.send(html);
});

app.listen(env.PORT, () => {
    console.log(`Express server kører på http://localhost:${env.PORT}`);
});
