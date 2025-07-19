import { Router } from "express";
import { createTasks, getTasks, updateTask } from "../controller/taskController";

const router = Router();

router.get("/", getTasks);

router.post("/", createTasks);

router.patch("/:taskId/status", updateTask)


export default router;