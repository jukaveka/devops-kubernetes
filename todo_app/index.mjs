import express from "express";
const app = express();
import axios from "axios";
import { mkdir, stat, writeFile } from "fs/promises";
import path from "path";
const __dirname = import.meta.dirname;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

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

const getTodos = async () => {
  return await axios.get(`${ process.env.SERVER_BACKEND_URL }/todos`)
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
      const response = await fetch(process.env.IMAGE_FETCH_URL)
      const arrayBuffer = await response.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      await writeFile(filePath, buffer)
    } catch (error) {
      console.log(error)
    }
  }

  const result = await getTodos()

  return res.render("index", { todos: result.data, backend_url: process.env.CLIENT_BACKEND_URL });
})

app.get("/healthz", async (req, res) => {
  try {
    await getTodos()
    return res.status(200).json({ message: "todo app is ready to handle requests" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "todo app is not ready to handle requests" })
  }
})

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
});
