import express from "express";
const app = express();

import bodyParser from "body-parser";
import cors from "cors"

import { connectToDatabase } from "./db.mjs";
import { Todo } from "./models.mjs";

await connectToDatabase()

app.use(bodyParser.json())
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: process.env.DEV_FRONTEND_URL }))
}

app.get("/todos", async (req, res) => {
  const todos = await Todo.findAll({})
  return res.json(todos)
})

app.post("/todos", async (req, res) => {
  const content = req.body.todo

  if (!content) {
    return res.status(400).json({ error: "Malformatted request: todo is missing" })
  }

  const newTodo = await Todo.create({ content })
  return res.status(200).send(newTodo)
})

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
});
