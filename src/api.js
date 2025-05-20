import express from "express";
import ServerlessHttp from "serverless-http";

const app = express();

app.get("/.netlify/functions/api", (req, res) => {
    return res.json({
        message: "Hello from the API!",
        time: new Date().toISOString(),
    });
});

const handler = ServerlessHttp(app);
module.exports.handler = async(event, context) => {
    return await handler(event, context);
}