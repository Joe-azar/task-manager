const express = require("express");
const { getTasks, addTask, updateTask, deleteTask, getTaskById, toggleTaskCompletion } = require("./taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getTaskById);
router.post("/", authMiddleware, addTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);
router.put("/toggle/:id", authMiddleware, toggleTaskCompletion); // ✅ Secure toggle route

module.exports = router;