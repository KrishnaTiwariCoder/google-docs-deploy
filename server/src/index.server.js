import { Server } from "socket.io";

import Connect from "./db.js";
import { getDocuent, updateDocument } from "./fuctions.js";
import path from "path";
import express from "express";
const PORT = 8080 || process.env.PORT;
const clientURL = "https://google-docs-deploy.onrender.com/";
const app = express();
Connect();
const io = new Server(PORT, {
  cors: {
    origin: clientURL,
    methods: ["GET", "POST"],
  },
});

const _dirname = path.resolve();

io.on("connection", (socket) => {
  socket.on("get-document", async (id) => {
    const document = await getDocuent(id);
    socket.join(id);

    socket.emit("load-document", document.data);

    socket.on("/", (data) => {
      socket.broadcast.to(id).emit("receive-data", data);
    });

    socket.on("save-document", async (data) => {
      await updateDocument(id, data);
      socket.broadcast.to(id).emit("receive-data", data);
    });
  });
});

app.use(express.static(path.join(_dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "client", "build", "index.html"));
});

app.listen(8000, () => {
  console.log("server listenning at port", 8000);
});
