const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.use(express.json());

app.get("/.netlify/functions/api", (req, res) => {
  res.json({
    message: "Hello, World! from a serverless function",
  });
});

app.post("/.netlify/functions/api", (req, res) => {
  res.json({
    message: "Hello from post!",
  });
});


const handler = serverless(app);
module.exports = { handler };
