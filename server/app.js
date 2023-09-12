const express = require("express");

const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

httpServer.listen(3000);

let isSendingData = true;

io.on("connection", (socket) => {
  sendData(socket);
});

function sendData(socket) {
  if (isSendingData) {
    socket.emit(
      "dataset1",
      Array.from({ length: 8 }, () => Math.floor(Math.random() * 600) + 10)
    );
    isSendingData = !isSendingData;
  } else {
    socket.emit(
      "dataset2",
      Array.from({ length: 8 }, () => Math.floor(Math.random() * 600) + 10)
    );
    isSendingData = !isSendingData;
  }

  setTimeout(() => {
    sendData(socket);
  }, 5000);
}
