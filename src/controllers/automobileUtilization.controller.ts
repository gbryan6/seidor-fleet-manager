import { Request, Response } from "express";
import { prisma } from "../server";

const createAutomobileUtilization = async (req: Request, res: Response) => {
  try {
    const { automobileId, driverId, reason } = req.body;

    const existingUtilizationDriver = await prisma.automobileUtilization.findFirst({
      where: {
        driverId,
        endDate: null,
      },
    });

    if (existingUtilizationDriver) {
      return res.status(400).json({ error: "Driver is already using a car" });
    }

    const existingUtilizationAutomobile = await prisma.automobileUtilization.findFirst({
      where: {
        automobileId,
        endDate: null,
      },
    });

    if (existingUtilizationAutomobile) {
      return res.status(400).json({ error: "This car is already being used by another driver" });
    }


    const utilization = await prisma.automobileUtilization.create({
      data: {
        automobileId,
        driverId,
        reason,
        startDate: new Date(),
      },
    });

    res.status(201).json(utilization);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const finishAutomobileUtilization = async (req: Request, res: Response) => {
  try {
    const utilizationId = req.params.id;
    const endDate = new Date();

    const utilization = await prisma.automobileUtilization.update({
      where: { id: utilizationId },
      data: {
        endDate,
      },
    });

    res.status(200).json(utilization);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


export default {
  createAutomobileUtilization,
  finishAutomobileUtilization
}