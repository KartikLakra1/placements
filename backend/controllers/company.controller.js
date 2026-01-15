import Company from "../models/company.model.js";
import Student from "../models/student.model.js";

export const addCompany = async (req, res) => {
  try {
    const { name, role, type, students } = req.body;

    const newCompany = new Company({ name, role, type, students });

    await newCompany.save();
    console.log(students);

    for (let rollNo of students) {
      await Student.findOneAndUpdate(
        { rollNo },
        { company: newCompany._id },
        { new: true }
      );
    }

    return res.status(201).json({
      message: "Company added successfully",
      company: newCompany,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while adding company",
      error: error.message,
    });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    return res.status(200).json({
      message: "Companies fetched successfully",
      companies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while fetching companies",
      error: error.message,
    });
  }
};
