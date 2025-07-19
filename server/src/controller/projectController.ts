import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
        const projects = await prisma.project.findMany();
        res.json(projects);
    } catch (error: any) {
        console.log("Error creating project:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ message: `Failed to create project ${errorMessage}` });
    }
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
    console.log("Request body:", req.body);

    const { name, description, startDate, endDate } = req.body;

    if (!name || !description || !startDate || !endDate) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }

    try {
        const newProject = await prisma.project.create({
            data: {
                name,
                description,
                startDate,
                endDate
            }
        });
        res.json(newProject);
    } catch (error: any) {
        console.log("Error creating project:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ message: `Failed to create project ${errorMessage}` });
    }
}