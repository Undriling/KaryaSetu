import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { projectId } = req.query;

  try {
    const tasks = await prisma.task.findMany({
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
  } catch (error: any) {
    console.log("Error creating Task error", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : String(error);
    res
      .status(500)
      .json({
        message: `Failed to create Task ${errorMessage}`,
      });
  }
};



export const createTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("Request body:", req.body);

  const {
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
  } = req.body;


  try {
    const newTask = await prisma.task.create({
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
  } catch (error: any) {
    console.log("Error creating Task:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : String(error);
    res
      .status(500)
      .json({
        message: `Failed to create Task ${errorMessage}`,
      });
  }
};


export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
        status: status,
      },
    });
    res.json(updatedTask);
  } catch (error: any) {
    console.log("Error Updating Task error", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : String(error);
    res
      .status(500)
      .json({
        message: `Failed to Updating Task ${errorMessage}`,
      });
  }
};