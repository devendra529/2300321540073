// app.ts
// it is used to set up the express server and define the routes for the application.
//it is also used to set up the logging middleware for the application.

import express from "express";
import cors from "cors";
import notificationRoutes from "./routes/notificationRoutes";
import { requestLogger } from "../logging_middleware/requestLogger";
import { errorLogger } from "../logging_middleware/errorLogger";

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/", (_, res) => {
  res.json({
    success: true,
    service: "Campus Notification Service"
  });
});

app.use("/api/notifications", notificationRoutes);

app.use(errorLogger);

app.listen(3000, () => {
  console.log("Notification Service Running On Port 3000");
});