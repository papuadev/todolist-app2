import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByUsername,
  loginUser,
  updateUser,
} from "../controller/userController";

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:username", getUserByUsername);
router.put("/:username", updateUser);
router.delete("/:username", deleteUser);
router.post("/login", loginUser);

export default router;
