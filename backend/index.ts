import express from "express";
import cors from "cors";
import type { Request, Response } from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

const FILE_PATH = path.join(__dirname, "data.json");

console.log("FILE_PATH:", FILE_PATH);
console.log("File exists:", fs.existsSync(FILE_PATH));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Express");
});
app.get("/todos", (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    res.status(200).json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Failed to read todos" });
  }
});

app.post("/todos", (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    const todos = JSON.parse(data);
    const { text, completed } = req.body;

    const newTodo = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      text,
      completed,
      createdAt: Date.now(),
    };
    todos.push(newTodo);
    fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2));
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

app.get("/todos/:id", (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    const todos = JSON.parse(data);

    const todo = todos.find((t: any) => t.id === req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to read todo" });
  }
});

app.put("/todos/:id", (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    const todos = JSON.parse(data);

    const index = todos.findIndex((t: any) => t.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: "Todo not found" });
    }
    const updateTodo = {
      ...todos[index],
      ...req.body,
      id: todos[index].id,
      createdAt: todos[index].createdAt,
    };

    todos[index] = updateTodo;
    fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2));
    res.status(200).json(updateTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

app.delete("/todos/:id", (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    const todos = JSON.parse(data);

    const index = todos.findIndex((t: any) => t.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const deletedTodo = todos[index];
    todos.splice(index, 1);

    fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2));
    res.status(200).json({ message: "Todo deleted", data: deletedTodo });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
