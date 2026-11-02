import express from "express";
const app = express();

import { mkdir, stat, writeFile } from "fs/promises";

import path from "path";
const __dirname = import.meta.dirname;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const todos = [
  { id: 1, content: "Need to learn EJS for Kubernetes course", done: true },
  { id: 2, content: "Familiarize with Lens as Kubernetes GUI", done: false },
  { id: 3, content: "Setup GKE account", done: false }
]

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

  return res.render("index", { todos });
})

const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
});
