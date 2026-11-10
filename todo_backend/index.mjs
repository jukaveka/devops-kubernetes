import bodyParser from "body-parser";
import express from "express";
const app = express();
import cors from "cors"

const FRONTEND_URL = process.env.NODE_ENV === "production"
  ? "http://localhost:8081"
  : "http://localhost:3000"

const todos = [
  { id: 1, content: "Need to learn EJS for Kubernetes course", done: true },
  { id: 2, content: "Familiarize with Lens as Kubernetes GUI", done: false },
  { id: 3, content: "Setup GKE account", done: false }
]

const getNewId = () => {
  const identifiers = todos.map(todo => todo.id)
  return Math.max(...identifiers) + 1
}

app.use(bodyParser.json())
app.use(cors({ origin: FRONTEND_URL }))

console.log(FRONTEND_URL)

app.get("/todos", (req, res) => {
  return res.json(todos)
})

app.post("/todos", (req, res) => {
  const todo = req.body.todo

  if (!todo) {
    return res.status(400).json({ error: "Malformatted request: todo is missing" })
  }

  const newTodo = { id: getNewId(), content: todo }
  todos.push(newTodo)
  return res.status(200).send(newTodo)
})

const port = process.env.PORT ? process.env.PORT : 3003;

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
});
