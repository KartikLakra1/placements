import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema({
  semester: { type: Number, required: true },
  cgpa: { type: Number, required: true },
});

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    semesterWiseCGPA: [semesterSchema],
    aggregateCGPA: { type: Number, required: true },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
