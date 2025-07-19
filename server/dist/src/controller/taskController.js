"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.createTasks = exports.getTasks = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.query;
    try {
        const tasks = yield prisma.task.findMany({
            where: {
                projectId: Number(projectId),
            },
            include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: true,
            },
        });
        res.json(tasks);
    }
    catch (error) {
        console.log("Error creating Task error", error);
        const errorMessage = error instanceof Error
            ? error.message
            : String(error);
        res
            .status(500)
            .json({
            message: `Failed to create Task ${errorMessage}`,
        });
    }
});
exports.getTasks = getTasks;
const createTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Request body:", req.body);
    const { title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId, } = req.body;
    try {
        const newTask = yield prisma.task.create({
            data: {
                title,
                description,
                status,
                priority,
                tags,
                startDate,
                dueDate,
                points,
                projectId,
                authorUserId,
                assignedUserId,
            },
        });
        res.status(201).json(newTask);
    }
    catch (error) {
        console.log("Error creating Task:", error);
        const errorMessage = error instanceof Error
            ? error.message
            : String(error);
        res
            .status(500)
            .json({
            message: `Failed to create Task ${errorMessage}`,
        });
    }
});
exports.createTasks = createTasks;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const { status } = req.body;
    try {
        const updatedTask = yield prisma.task.update({
            where: {
                id: Number(taskId),
            },
            data: {
                status: status,
            },
        });
        res.json(updatedTask);
    }
    catch (error) {
        console.log("Error Updating Task error", error);
        const errorMessage = error instanceof Error
            ? error.message
            : String(error);
        res
            .status(500)
            .json({
            message: `Failed to Updating Task ${errorMessage}`,
        });
    }
});
exports.updateTask = updateTask;
