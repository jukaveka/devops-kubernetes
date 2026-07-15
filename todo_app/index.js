const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return res.send("To-do application (to be done)");
})

const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
});