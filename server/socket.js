const app = require("./app");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const Dm = require("./models/dmModel");
const Channel = require("./models/channelModel");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.leave(data.oldChannel);
    socket.join(data.newChannel);
  });

  socket.on("send_message", async (data) => {
    socket.to(data.room).emit("receive_message", data);

    if (data.type === "DM") {
      let user1, user2;

      if (data.user1 > data.user2) {
        user1 = data.user2;
        user2 = data.user1;
      } else {
        user1 = data.user1;
        user2 = data.user2;
      }

      const dm = (await Dm.find({ user1, user2 }))[0];

      dm.messages.push({
        from: data.from,
        text: data.text,
        date: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      });

      await dm.save();
    } else {
      const channelFind = await Channel.findById(data.room);

      channelFind.messages.push({
        from: data.from,
        text: data.text,
      });

      await channelFind.save();
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on("send_message", (data) => {
//     console.log(data);
//     socket.to(data.roomId).emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });

module.exports = server;
