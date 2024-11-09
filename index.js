import express from "express";
import sequelize from "./config/database.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Import routes
import mkRoutes from "./routes/mkRoutes.js";
import krsRoutes from "./routes/krsRoutes.js";
import mhsRoutes from "./routes/mhsRoutes.js";
import ipkRoutes from "./routes/ipkRoutes.js";

app.use("/mk", mkRoutes);
app.use("/krs", krsRoutes);
app.use("/mhs", mhsRoutes);
app.use("/ipk", ipkRoutes);

sequelize.sync().then(() => {
    console.log("Database connected and synchronized");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
