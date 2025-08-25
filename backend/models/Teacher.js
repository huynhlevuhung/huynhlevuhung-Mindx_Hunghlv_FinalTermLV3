import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    code: { type: String, required: true, unique: true },
    startDate: { type: Date },
    endDate: { type: Date },
    teacherPositionsId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "TeacherPosition" },
    ], // giữ nguyên dữ liệu
    degrees: [
      {
        type: { type: String },
        school: { type: String },
        major: { type: String },
        year: { type: Number },
        isGraduated: { type: Boolean },
      },
    ],
  },
  { timestamps: true }
);

// Virtual populate để vẫn có field teacherPositions khi populate
teacherSchema.virtual("teacherPositions", {
  ref: "TeacherPosition",
  localField: "teacherPositionsId",
  foreignField: "_id",
});

teacherSchema.set("toObject", { virtuals: true });
teacherSchema.set("toJSON", { virtuals: true });

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
