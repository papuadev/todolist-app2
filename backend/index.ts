import express from "express";
import cors from "cors";
import type { Request, Response } from "express";
import todoRouter from "./routes/todoRouter";
import userRouter from "./routes/userRouter";
import pool from "./database/connection";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Express");
});

app.use("/todos", todoRouter);
app.use("/users", userRouter);

pool.connect(
  (err: Error | undefined, client: any, release: () => void): void => {
    if (err) {
      console.error("Error connecting to the database", err);
      return;
    }
    console.log("Connected to the database");
    release();
  },
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
