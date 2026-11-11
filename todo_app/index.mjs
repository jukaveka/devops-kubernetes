import express from "express";
const app = express();
import axios from "axios";

import { mkdir, stat, writeFile } from "fs/promises";

import path from "path";
const __dirname = import.meta.dirname;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const CLIENT_BACKEND_URL = process.env.NODE_ENV === "production" ? "http://todo.localhost:8081" : "http://localhost:3003"
const SERVER_BACKEND_URL = process.env.NODE_ENV === "production" ? "http://todo-backend-svc:1003" : "http://localhost:3003"

const isEmpty = (value) => {
  return value === undefined || value === 0 || value === null || value === "";
}

const dateDifferenceInMinutes = (date1, date2) => {
  const milliseconds = Math.abs(date2 - date1);
  const minutes = milliseconds / (1000 * 60);
  return minutes;
};

const isValid = (fetchedAt) => {
  if (isEmpty(fetchedAt) || typeof fetchedAt !== "object") {
    return false;
  }

  const currentTime = new Date();
  const minutes = dateDifferenceInMinutes(fetchedAt, currentTime);
  return minutes <= 10;
}

app.get("/", async (req, res) => {
  let fetchedAt;
  const dirPath = path.join(__dirname, "public", "images")
  const filePath = path.join(dirPath, "image.jpg")

  try {
    const stats = await stat(filePath)
    fetchedAt = new Date(stats.mtimeMs)
  } catch (error) {
    console.log(error)
    console.log("Image file metadata not found")
  }

  if (!isValid(fetchedAt)) {
    try {
      await mkdir(dirPath, { recursive: true })
      const response = await fetch("https://picsum.photos/1200")
      const arrayBuffer = await response.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      await writeFile(filePath, buffer)
    } catch (error) {
      console.log(error)
    }
  }

  const result = await axios.get(`${SERVER_BACKEND_URL}/todos`)

  return res.render("index", { todos: result.data, backend_url: CLIENT_BACKEND_URL });
})

const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
});
