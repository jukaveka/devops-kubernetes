import express from "express";
const app = express();
import { readFile } from "fs/promises";

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

app.get("/", async (req, res) => {
  const log = await readLastLog();
  return res.send(`${log}`);
})

const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
