import Company from "../models/company.model.js";
import Student from "../models/student.model.js";

// Create a company
export const createCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all companies
export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate("shortlisted.finalSelected", "name rollNo department aggregateCGPA");
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single company
export const getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate("shortlisted.finalSelected", "name rollNo department aggregateCGPA");
    if (!company) return res.status(404).json({ error: "Company not found" });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add student to a stage (registered, OA, interview, final)
export const addStudentToStage = async (req, res) => {
  try {
    const { companyId, stage } = req.params;
    const { studentId } = req.body;

    if (!["registered", "onlineAssessment", "interview", "finalSelected"].includes(stage)) {
      return res.status(400).json({ error: "Invalid stage" });
    }

    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ error: "Company not found" });

    // Check student exists
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: "Student not found" });

    company.shortlisted[stage].push(studentId);
    await company.save();

    res.json({ message: `Student added to ${stage}`, company });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
