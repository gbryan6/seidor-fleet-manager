import { Request, Response } from "express";
import { prisma } from "../server";

const createDriver = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const driver = await prisma.driver.create({
      data: {
        name,
      },
    });

    res.status(201).json(driver);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateDriver = async (req: Request, res: Response) => {
  try {
    const driverId = req.params.id;

    const { name } = req.body;

    const updatedDriver = await prisma.driver.update({
      where: { id: driverId },
      data: {
        name,
      },
    });

    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  createDriver,
  updateDriver
}