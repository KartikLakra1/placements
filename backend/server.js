import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import companyRoutes from "./routes/company.routes.js";
import studentRoutes from "./routes/student.route.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/companies", companyRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
