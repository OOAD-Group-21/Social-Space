const express = require("express");

const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());

// ROUTES

app.use("/", userRouter);

module.exports = app;
