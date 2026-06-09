// notificationRoutes.ts
// it is used to define the routes for the notification service. it defines the route for getting all the notifications from the database.

import { Router } from "express";
import { getAllNotifications } from "../controllers/notificationController";

const router = Router();

router.get("/", getAllNotifications);

export default router;