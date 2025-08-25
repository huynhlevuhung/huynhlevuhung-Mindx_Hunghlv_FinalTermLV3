import User from "../models/User.js";
import Teacher from "../models/Teacher.js";
import TeacherPosition from "../models/TeacherPosition.js";
import generateCode from "../utils/generateCode.js";

// [GET] /teachers?page=1&limit=10
const getAllTeachers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const teachers = await Teacher.find()
      .populate("userId", "name email phoneNumber address dob identity")
      .populate("teacherPositions", "name code")
      .populate("degrees", "name level school")
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await Teacher.countDocuments();

    res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      data: teachers,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách giáo viên", error });
  }
};

// [GET] /teachers/:id
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({
      _id: req.params.id,
      isDeleted: false,
    })
      .populate("userId", "name email phoneNumber address dob identity")
      .populate("teacherPositions", "name code")
      .populate("degrees", "name level school");

    if (!teacher) {
      return res.status(404).json({ message: "Không tìm thấy giáo viên" });
    }

    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy giáo viên", error });
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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

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

    let code = generateCode();
    while (await Teacher.findOne({ code })) {
      code = generateCode();
    }

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

// [PUT] /teachers/:id
const updateTeacher = async (req, res) => {
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

    const teacher = await Teacher.findById(req.params.id).populate("userId");
    if (!teacher || teacher.isDeleted) {
      return res.status(404).json({ message: "Không tìm thấy giáo viên" });
    }

    const user = teacher.userId;
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.address = address || user.address;
      user.identity = identity || user.identity;
      user.dob = dob || user.dob;
      await user.save();
    }

    teacher.startDate = startDate || teacher.startDate;
    teacher.endDate = endDate || teacher.endDate;
    teacher.teacherPositions = teacherPositions || teacher.teacherPositions;
    teacher.degrees = degrees || teacher.degrees;

    await teacher.save();

    res.status(200).json({ user, teacher });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật giáo viên", error });
  }
};

// [DELETE] /teachers/:id
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher || teacher.isDeleted) {
      return res.status(404).json({ message: "Không tìm thấy giáo viên" });
    }

    teacher.isDeleted = true;
    await teacher.save();

    res.status(200).json({ message: "Đã xoá giáo viên (soft delete)" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xoá giáo viên", error });
  }
};

export {
  deleteTeacher,
  updateTeacher,
  createTeacher,
  getAllTeachers,
  getTeacherById,
};
