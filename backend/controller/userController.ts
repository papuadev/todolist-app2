import type { Request, Response } from "express";
import pool from "../database/connection";
import bcrypt from "bcrypt";
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM tb_users;");
    const users = result.rows;
    res.send(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to read data" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO tb_users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, passwordHash],
    );
    const newUser = result.rows[0];
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create data" });
  }
};

export const getUserByUsername = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const result = await pool.query(
      "SELECT * FROM tb_users WHERE username = $1;",
      [username],
    );
    const user = result.rows;
    if (!user.length) {
      return res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to read data" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const { email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "SELECT * FROM tb_users WHERE username = $1",
      [username],
    );
    const user = result.rows;
    if (!user.length) {
      return res.status(404).json({ error: "Data not found" });
    }

    const updateresult = await pool.query(
      "UPDATE tb_users SET email = $1, password = $2 WHERE username = $3 RETURNING *;",
      [email, passwordHash, username],
    );
    const updateUser = updateresult.rows[0];
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update data" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const result = await pool.query(
      "DELETE FROM tb_users WHERE username = $1 RETURNING *;",
      [username],
    );
    const deletedUser = result.rows[0];
    if (deletedUser === undefined) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted", data: deletedUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete data" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const result = await pool.query(
      "SELECT * FROM  tb_users WHERE username = $1;",
      [username],
    );
    if (!result.rows.length) {
      return res.status(401).json({ message: "Invalid username" });
    }
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const { password: _, ...safeUser } = user;

    res.status(200).json({ message: "Login successfully", data: safeUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};
