import { Request, Response } from "express";
import { getNotifications } from "../services/notificationService";

export const getAllNotifications = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const notifications = await getNotifications();

    res.status(200).json({
      success: true,
      notifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications"
    });
  }
};