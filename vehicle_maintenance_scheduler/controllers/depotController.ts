import { Request, Response } from "express";
import { buildSchedule } from "../services/schedulerService";

export async function getSchedule(req: Request, res: Response): Promise<void> {
  try {
    const schedule = await buildSchedule();
    res.status(200).json({ success: true, schedule });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}