const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  // console.log(req.cookies);
  next();
});
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// ROUTES

app.use("/", userRouter);

module.exports = app;
