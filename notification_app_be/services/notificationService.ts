// notificationService.ts
// this is used to define the functions that will be used to get the notifications from the evaluation service.

import axios from "axios";
import { Notification } from "../models/Notification";

const EVALUATION_URL =
  "http://4.224.188.213/evaluation-service/notifications";

export const getNotifications = async (): Promise<Notification[]> => {
  const response = await axios.get(EVALUATION_URL);

  return response.data.notifications;
};