// student.routes.js
import express from "express";
import multer from "multer";
import Student from "../models/student.model.js";
import {
  importStudents,
  getStudents,
  getStudentByRollNo,
} from "../controllers/student.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload & import students
router.post("/import", upload.single("file"), importStudents);

// Get all students (with optional department or rollNo filter)
router.get("/", getStudents);

// get by roll no
router.get("/by-rollno", getStudentByRollNo);

// GET single student
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("company");
    if (!student) return res.status(404).json({ error: "Student not found" });

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
