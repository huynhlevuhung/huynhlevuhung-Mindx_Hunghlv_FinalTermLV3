import TeacherPosition from "../models/TeacherPosition.js";

// [GET] /teacher-positions
const getAllTeacherPositions = async (req, res) => {
  try {
    const positions = await TeacherPosition.find();
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

// [DELETE] /teacher-positions/:id
 const deleteTeacherPosition = async (req, res) => {
  try {
    const id = req.params.id;

    // ❌ Không xoá thật khỏi DB, chỉ đặt isDeleted = true
    const result = await TeacherPosition.findByIdAndUpdate(id, {
      isDeleted: true,
    });

    if (!result) {
      return res.status(404).json({ message: "Không tìm thấy vị trí" });
    }

    res.status(204).send(); // Thành công, không trả nội dung
  } catch (error) {
    console.error("Lỗi xoá vị trí:", error);
    res.status(500).json({ message: "Lỗi khi xoá vị trí", error });
  }
};

// [GET] /teacher-positions/:id
 const getTeacherPositionById = async (req, res) => {
  try {
    const id = req.params.id;
    const position = await TeacherPosition.findById(id);

    if (!position || position.isDeleted) {
      return res.status(404).json({ message: "Không tìm thấy vị trí" });
    }

    res.status(200).json(position);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy chi tiết vị trí", error });
  }
};

// [PUT] /teacher-positions/:id
 const updateTeacherPosition = async (req, res) => {
  try {
    const { name, code } = req.body;

    const position = await TeacherPosition.findById(req.params.id);
    if (!position) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy vị trí công tác" });
    }

    position.name = name || position.name;
    position.code = code || position.code;

    await position.save();

    res.status(200).json(position);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật vị trí công tác", error });
  }
};

export {

  updateTeacherPosition,
  getTeacherPositionById,
  deleteTeacherPosition,
  createTeacherPosition,
  getAllTeacherPositions,
};
