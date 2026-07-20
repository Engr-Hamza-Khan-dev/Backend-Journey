import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import { redisPublish, redisSubscribe } from "./connection.js";
import { json } from "stream/consumers";


dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const RedisChannel = "chat";
dotenv.config();

const PORT = process.env.PORT || 8080;
wss.on("connection", (ws) => {
  console.log("client connected on port " + PORT);

  redisSubscribe.subscribe(RedisChannel);
  redisSubscribe.on("message", (channel, message) => {
    if (channel === RedisChannel) {
      wss.clients.forEach((client) => {
        client.send(JSON.stringify({ message: message.toString() }));
        console.log("message sent to client: ", message.toString());
      });
    }
  });

  ws.on("message", async (message) => {
    console.log("message received: ", message.toString());

    // Relay the message to Redis channel
    console.log("publishing to redis channel");
    await redisPublish.publish(RedisChannel, message.toString());
    console.log("published to redis channel");

  });


  ws.on("error", (error) => {
    console.log("error: ", error);
  });

});

server.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
