import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

//configure env
dotenv.config();
const app = express();

//confiigure env
connectDB();

//esmodule fix
const _dirname = fileURLToPath("import.meta.url");
const __dirname = path.dirname(__filename);

//middlelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(_dirname, "./client/build")));
// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest app
app.use("*", function (req, res) {
  res.sendFile(path.join(_dirname, "./client/build/index.html"));
});

//port
const PORT = process.env.PORT;

//`

app.listen(PORT, () => {
  console.log(
    `Server is runing on ${process.env.IHSAN} mode on port ${PORT}`.bgRed
  );
});
