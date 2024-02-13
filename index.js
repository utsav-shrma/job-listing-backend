const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const mongodb = require("./config/mongodb");

app.get("/", (req, res) => res.send("Hello world"));

app.get("/health", (req, res) =>
  res.json({
    service: "Job listing server",
    status: "Active",
    time: new Date(),
  })
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
