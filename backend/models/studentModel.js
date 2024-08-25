import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    positive: {
      type: Number,
      required: true,
    },
    negative: {
      type: Number,
      required: true,
    },
    attendance: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields
  }
);

export const Student = mongoose.model("Student", studentSchema);
