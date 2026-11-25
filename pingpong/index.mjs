import express from "express";
const app = express();
import { readFile, writeFile } from "fs/promises";
import { connectToDatabase, testDatabaseConnection } from "./db.mjs";
import { Ping } from "./models.mjs";

await connectToDatabase()

app.get("/pingpong", async (req, res) => {
  const pings = await Ping.findOne({
    attributes: ["id", "counter"],
    where: { id: 1 } }
  )
  let count;

  if (!pings) {
    await Ping.create({ counter: 1 })
    count = 0
  } else {
    count = pings.counter
    pings.counter = pings.counter + 1
    await pings.save()
  }

  await writeFile("files/count.txt", `Ping / Pongs: ${count}` ,{ encoding: "utf8" } );
  return res.send(`pong ${count}`);
})

app.get("/pings", async  (req, res) => {
  const pings = await Ping.findOne({
    attributes: ["id", "counter"],
    where: { id: 1 } }
  )

  const content = `Ping / Pongs: ${pings.counter}`
  return res.json({ pings: content })
})

app.get("/healthz", async (req, res) => {
  const dbReady = await testDatabaseConnection()

  if (!dbReady) {
    return res.status(500).json({ error: "Database is not ready to accept connection" })
  }

  return res.status(200).json({ message: "Application is healthy and ready to accept conncetions." })
})

const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
});