import fs from "fs";
import csv from "csv-parser";
import Student from "../models/student.model.js";

// Bulk import from CSV
export const importStudents = async (req, res) => {
  try {
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => {
        const semesterWiseCGPA = Object.keys(row)
          .filter(key => key.toLowerCase().startsWith("semester"))
          .map((key, i) => ({
            semester: i + 1,
            cgpa: parseFloat(row[key])
          }));

        results.push({
          name: row.name,
          rollNo: row.rollNo,
          department: row.department,
          semesterWiseCGPA,
          aggregateCGPA: parseFloat(row.aggregate)
        });
      })
      .on("end", async () => {
        await Student.insertMany(results);
        res.status(201).json({ message: "✅ Students imported", count: results.length });
      });
  } catch (err) {
    res.status(500).json({"here here :" : err });
  }
};

// Get all students (with optional department OR rollNo filter)
export const getStudents = async (req, res) => {
  try {
    const { department, rollNo } = req.query;
    const filter = {};

    if (department) filter.department = department;
    if (rollNo) filter.rollNo = rollNo;

    const students = await Student.find(filter).sort({ aggregateCGPA: -1 });

    // If rollNo is provided, return a single student (or not found)
    if (rollNo) {
      if (students.length === 0) {
        return res.status(404).json({ error: "Student not found" });
      }
      return res.json(students[0]);
    }

    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get single student (by id OR rollNo)
export const getStudent = async (req, res) => {
  try {
    const { id } = req.params; // Mongo _id
    const { rollNo } = req.query; // Optional roll number

    let student;
    if (rollNo) {
      student = await Student.findOne({ rollNo });
    } else {
      student = await Student.findById(id);
    }

    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get student by roll number
export const getStudentByRollNo = async (req, res) => {
  try {
    const { rollNo } = req.query;
    if (!rollNo) return res.status(400).json({ error: "rollNo query required" });

    const student = await Student.findOne({ rollNo });
    if (!student) return res.status(404).json({ error: "Student not found" });

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
