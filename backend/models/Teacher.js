const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  code: { type: String, required: true, unique: true }, // 10 số
  startDate: { type: Date },
  endDate: { type: Date },
  teacherPositions: [{ type: mongoose.Schema.Types.ObjectId, ref: "TeacherPosition" }],
  degrees: [
    {
      type: { type: String }, // Cử nhân, Thạc sĩ, ...
      school: { type: String },
      major: { type: String },
      year: { type: Number },
      isGraduated: { type: Boolean },
    },
  ],
});

module.exports = mongoose.model("Teacher", teacherSchema);
