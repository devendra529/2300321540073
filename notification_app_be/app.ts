import express from "express";
import { requestLogger, errorLogger } from "../logging_middleware";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/", (_, res) => {
  res.json({
    success: true,
    service: "Campus Notification Service"
  });
});

app.get("/test-error", () => {
  throw new Error("Testing middleware");
});

app.use(errorLogger);

app.listen(3000, () => {
  console.log("Notification Service Running On Port 3000");
});