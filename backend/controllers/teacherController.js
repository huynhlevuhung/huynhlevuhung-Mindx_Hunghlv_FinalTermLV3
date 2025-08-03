const User = require("../models/User");
const Teacher = require("../models/Teacher");
const TeacherPosition = require("../models/TeacherPosition");
const generateCode = require("../utils/generateCode");

// [GET] /teachers?page=1&limit=10
const getAllTeachers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const teachers = await Teacher.find({ isDeleted: false })
      .populate("userId", "name email phoneNumber address")
      .populate("teacherPositions", "name code")
      .skip(Number(skip))
      .limit(Number(limit));

    const formatted = teachers.map((teacher) => ({
      code: teacher.code,
      isActive: teacher.isActive,
      user: teacher.userId,
      teacherPositions: teacher.teacherPositions,
      degrees: teacher.degrees,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách giáo viên", error });
  }
};

// [POST] /teachers
const createTeacher = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      address,
      identity,
      dob,
      startDate,
      endDate,
      teacherPositions,
      degrees,
    } = req.body;

    // Kiểm tra email có bị trùng không
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // Tạo user
    const newUser = new User({
      name,
      email,
      phoneNumber,
      address,
      identity,
      dob,
      role: "TEACHER",
    });

    const savedUser = await newUser.save();

    // Sinh mã code không trùng
    let code = generateCode();
    while (await Teacher.findOne({ code })) {
      code = generateCode();
    }

    // Tạo teacher
    const newTeacher = new Teacher({
      userId: savedUser._id,
      code,
      startDate,
      endDate,
      teacherPositions,
      degrees,
    });

    const savedTeacher = await newTeacher.save();

    res.status(201).json({ user: savedUser, teacher: savedTeacher });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo giáo viên", error });
  }
};

module.exports = {
  getAllTeachers,
  createTeacher,
};
