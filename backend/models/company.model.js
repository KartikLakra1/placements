import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }, // e.g., "SDE Intern", "Analyst", etc.
  type: {
    type: String,
    enum: ["2M Internship", "6M+PPO", "6M+FTE", "FTE"],
    required: true,
  },
  students: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Company", companySchema);
