import express from "express";
import { addCompany, getCompanies } from "../controllers/company.controller.js";

const router = express.Router();

router.post("/add", addCompany);
router.get("/get", getCompanies);

export default router;
