import express from "express";
import sequelize from "./config/database.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Import routes
import mkRoutes from "./routes/mkRoutes.js";
import krsRoutes from "./routes/krsRoutes.js";
import mhsRoutes from "./routes/mhsRoutes.js";
import ipkRoutes from "./routes/ipkRoutes.js";

app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(mkRoutes);
app.use(krsRoutes);
app.use(mhsRoutes);
app.use(ipkRoutes);

app.get("/", (req, res) => {
    res.redirect("https://github.com/test-rei/be-ppl");
});

sequelize.sync({}).then(() => {
    console.log("Database connected and synchronized");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
