import express from "express";
import depotRoutes from "./routes/depotRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/depots", depotRoutes);

app.listen(PORT, () => {
  console.log(`Vehicle Scheduling Service running on port ${PORT}`);
});

export default app;