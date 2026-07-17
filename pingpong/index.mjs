import express from "express";
const app = express();

let count = 0;

app.get("/", (req, res) => {
  const oldCount = count;
  count = count + 1;
  return res.send(`pong ${oldCount}`);
})

const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
});