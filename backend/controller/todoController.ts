import type { Request, Response } from "express";
import pool from "../database/connection";

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM tb_todos;");
    const todos = result.rows;
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to read data" });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { text, completed } = req.body;

    const result = await pool.query(
      "INSERT INTO tb_todos (text, completed) VALUES ($1, $2) RETURNING *;",
      [text, completed],
    );
    const newTodo = result.rows[0];
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await pool.query("SELECT * FROM tb_todos WHERE id = $1;", [
      id,
    ]);
    const todos = result.rows;

    if (!todos.length) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to read todo" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { text, completed } = req.body;
    const result = await pool.query("SELECT * FROM tb_todos WHERE id = $1;", [
      id,
    ]);
    const todos = result.rows;

    if (!todos.length) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const updateResult = await pool.query(
      "UPDATE tb_todos SET text = $1, completed = $2 WHERE id = $3 RETURNING *;",
      [text, completed, id],
    );
    const updateTodo = updateResult.rows[0];
    res.status(200).json(updateTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await pool.query(
      "DELETE FROM tb_todos WHERE id = $1 RETURNING *;",
      [id],
    );
    const deletedTodo = result.rows[0];

    if (deletedTodo === undefined) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted", data: deletedTodo });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
