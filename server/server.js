const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT;

const DB = process.env.DATABASE_STRING.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
try {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB connection successful!"));
} catch (error) {
  console.log("DATABASE CONNECTION FAILED:", error);
}

const server = app.listen(port, () => {
  console.log(`Server listening on port : ${port}`);
});
