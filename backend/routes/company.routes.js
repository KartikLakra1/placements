import express from "express";
import { addCompany } from "../controllers/company.controller.js";

const router = express.Router();

router.post("/add", addCompany);

export default router;
