import { Request, Response } from "express";
import { prisma } from "../server";

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
    res.status(500).json({ error: "Internal server error" });
  }
};


export default {
  createAutomobile
}