import { Request, Response } from "express";
import { prisma } from "../server";

const createAutomobile = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'ok'});
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createAutomobile
}