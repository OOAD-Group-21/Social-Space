const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cors = require("cors");

const server = require("./socket");

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

// Socket connection



// server.use(cors(corsOptions))
server.listen(port, () => {
  console.log(`Server listening on port : ${port}`);
});
