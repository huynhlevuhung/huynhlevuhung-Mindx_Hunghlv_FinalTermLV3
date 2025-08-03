const TeacherPosition = require("../models/TeacherPosition");

// [GET] /teacher-positions
const getAllTeacherPositions = async (req, res) => {
  try {
    const positions = await TeacherPosition.find({ isDeleted: false });
    res.status(200).json(positions);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách vị trí", error });
  }
};

// [POST] /teacher-positions
const createTeacherPosition = async (req, res) => {
  try {
    const { name, code, des } = req.body;

    // Kiểm tra code đã tồn tại chưa
    const existing = await TeacherPosition.findOne({ code });
    if (existing) {
      return res.status(400).json({ message: "Code đã tồn tại!" });
    }

    const newPosition = new TeacherPosition({
      name,
      code,
      des,
    });

    const saved = await newPosition.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo vị trí", error });
  }
};

module.exports = {
  getAllTeacherPositions,
  createTeacherPosition,
};
