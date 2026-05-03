import type { Request, Response } from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

const FILE_PATH = path.join(__dirname, "../json/user.json");

export const getAllUsers = (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    res.status(200).json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Failed to read users" });
  }
};

export const createUser = (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    const users = JSON.parse(data);
    const { username, email, password } = req.body;
    const newUser = { username, email, password, createdAt: Date.now() };
    users.push(newUser);
    fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2));
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const getUserByUsername = (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    const users = JSON.parse(data);
    const { username } = req.params;
    const user = users.find((u: any) => u.username === username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to read user" });
  }
};

export const updateUser = (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    const users = JSON.parse(data);
    const { username } = req.params;
    const index = users.findIndex((u: any) => u.username === username);
    if (index === -1) {
      return res.status(404).json({ error: "User not found" });
    }
    const { email, password } = req.body;
    users[index] = { ...users[index], email, password };
    fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2));
    res.status(200).json(users[index]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const deleteUser = (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    const users = JSON.parse(data);
    const { username } = req.params;
    const index = users.findIndex((u: any) => u.username === username);
    if (index === -1) {
      return res.status(404).json({ error: "User not found" });
    }
    users.splice(index, 1);
    fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2));
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export const loginUser = (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    const users = JSON.parse(data);
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "Username dan password wajib diisi" });
      return;
    }

    const user = users.find(
      (u: any) => u.username === username && u.password === password,
    );

    if (!user) {
      res.status(401).json({ message: "Username atau password salah" });
      return;
    }

    // Jangan kirim password ke frontend
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};
