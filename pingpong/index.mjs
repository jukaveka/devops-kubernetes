import express from "express";
const app = express();
import { writeFile } from "fs/promises";

let count = 0;

app.get("/pingpong", (req, res) => {
  const oldCount = count;
  count = count + 1;
  writeFile("files/count.txt", `Ping / Pongs: ${oldCount}` ,{ encoding: "utf8" } )
  return res.send(`pong ${oldCount}`);
})

const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
});