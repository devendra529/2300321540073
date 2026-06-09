import { Router } from "express";
import { getSchedule } from "../controllers/depotController";

const router = Router();

router.get("/schedule", getSchedule);

export default router;