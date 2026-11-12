import express from "express";
const app = express();
import { readFile } from "fs/promises";
import axios from "axios";

if (process.env.NODE_ENV === "development") {
  const dotenv = await import("dotenv")
  dotenv.config()
}

const pingpongAddress = process.env.NODE_ENV === "production"
  ? "http://ping-pong-svc:1002/pings"
  : "http://localhost:3000/pings"

const readLastLog = async () => {
  try {
    const logs = await readFile("output/log.txt", { encoding: "utf8" });
    const splitLogs = logs.split("\n")
    const log = splitLogs[splitLogs.length - 1];
    return log;
  } catch (error) {
    console.log(error.message)
  }
}

const readPongCount = async () => {
  try {
    const response = await axios.get(pingpongAddress)
    return response.data.pings;
  } catch (error) {
    console.log(error.message)
  }
}

const readContentFile = async () => {
  try {
    const content = await readFile("files/content.txt", { encoding: "utf8" });
    return content;
  } catch (error) {
    console.log(error.message)
  }
}

app.get("/", async (req, res) => {
  const log = await readLastLog();
  const count = await readPongCount();
  const message = process.env.MESSAGE;
  const content = await readContentFile()
  return res.send(`file content: ${content} <br\> env variable: message=${message} <br\> ${log} <br\> ${count}`);
})

const port = process.env.PORT ? process.env.PORT : 3003;

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
