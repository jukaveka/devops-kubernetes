import express from "express";
const app = express();
import { readFile, writeFile } from "fs/promises";

let count = 0;

app.get("/pingpong", async (req, res) => {
  const oldCount = count;
  count = count + 1;
  await writeFile("files/count.txt", `Ping / Pongs: ${oldCount}` ,{ encoding: "utf8" } );
  return res.send(`pong ${oldCount}`);
})

app.get("/pings", async  (req, res) => {
  const content = await readFile("files/count.txt", { encoding: "utf8" })
  return res.json({ pings: content })
})

const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
});