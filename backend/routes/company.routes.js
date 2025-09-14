import express from "express";
import { createCompany, getCompanies, getCompany, addStudentToStage } from "../controllers/company.controller.js";

const router = express.Router();

// Create company
router.post("/", createCompany);

// Get all companies
router.get("/", getCompanies);

// Get one company
router.get("/:id", getCompany);

// Add student to a stage
router.post("/:companyId/:stage", addStudentToStage);

export default router;
