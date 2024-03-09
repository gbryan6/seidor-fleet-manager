import { Request, Response } from "express";
import { prisma } from "../server";
import { error } from "console";

const createAutomobile = async (req: Request, res: Response) => {
  try {
    const { plate, color, brand } = req.body;

    const existingAutomobile = await prisma.automobile.findUnique({
      where: { plate },
    });

    if (existingAutomobile) {
      return res.status(400).json({ error: "Plate already registered" });
    }

    const automobile = await prisma.automobile.create({
      data: {
        plate,
        color,
        brand,
      },
    });

    res.status(201).json(automobile);
  } catch (error) {
    res.status(500).json({ error: `Internal server error ${error}` });
  }
};

const updateAutomobile = async (req: Request, res: Response) => {
  try {
    const automobileId = req.params.id;

    const { plate, color, brand } = req.body;

    const existingAutomobile = await prisma.automobile.findUnique({
      where: { plate },
    });

    if (existingAutomobile) {
      return res.status(400).json({ error: "Plate already registered" });
    }

    const updatedAutomobile = await prisma.automobile.update({
      where: { id: automobileId },
      data: {
        plate,
        color,
        brand,
      },
    });
    res.status(200).json(updatedAutomobile);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteAutomobile = async (req: Request, res: Response) => {
  try {
    const automobileId = req.params.id;

    await prisma.automobile.delete({
      where: { id: automobileId },
    });

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAutomobileById = async (req: Request, res: Response) => {
  try {
    const automobileId = req.params.id;

    const automobile = await prisma.automobile.findUnique({
      where: { id: automobileId },
    });

    if (!automobile) {
      res.status(404).json({ error: "Automobile not found" });

    } else {
      res.status(200).json(automobile);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  createAutomobile,
  updateAutomobile,
  deleteAutomobile,
  getAutomobileById
}