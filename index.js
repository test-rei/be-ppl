import express from "express";
import { json } from "body-parser";
import { sequelize } from "../models/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(json());

// Import routes
import mkRoutes from "./routes/mkRoutes";
import krsRoutes from "./routes/krsRoutes";
import mhsRoutes from "./routes/mhsRoutes";
import ipkRoutes from "./routes/ipkRoutes";

app.use("/mk", mkRoutes);
app.use("/krs", krsRoutes);
app.use("/mhs", mhsRoutes);
app.use("/ipk", ipkRoutes);

sequelize.sync({ alter: true }).then(() => {
    console.log("Database connected and synchronized");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
