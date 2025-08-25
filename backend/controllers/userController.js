
import User from "../models/User.js";

// [GET] /users?page=1&limit=10
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const users = await User.find({ isDeleted: false })
      .skip(Number(skip))
      .limit(Number(limit))
      .select("-password"); // ẩn password

    const total = await User.countDocuments({ isDeleted: false });

    res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách user", error });
  }
};

// [GET] /users/:id
const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, isDeleted: false }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy user" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy chi tiết user", error });
  }
};

// [POST] /users (register)
const createUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address, identity, dob, role } = req.body;

    // kiểm tra email trùng
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    const newUser = new User({
      name,
      email,
      password,
      phoneNumber,
      address,
      identity,
      dob,
      role,
    });

    const saved = await newUser.save();

    res.status(201).json({
      _id: saved._id,
      name: saved.name,
      email: saved.email,
      role: saved.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo user", error });
  }
};

// [PUT] /users/:id
const updateUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, address, identity, dob, role, isAdmin } = req.body;

    const user = await User.findById(req.params.id);
    if (!user || user.isDeleted) {
      return res.status(404).json({ message: "Không tìm thấy user" });
    }

    if (email && email !== user.email) {
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: "Email đã tồn tại" });
      }
      user.email = email;
    }

    user.name = name || user.name;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.address = address || user.address;
    user.identity = identity || user.identity;
    user.dob = dob || user.dob;
    user.role = role || user.role;
    user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;

    const updated = await user.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật user", error });
  }
};

// [DELETE] /users/:id (soft delete)
const deleteUser = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, { isDeleted: true });
    if (!result) {
      return res.status(404).json({ message: "Không tìm thấy user" });
    }
    res.status(200).json({ message: "Đã xoá user (soft delete)" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xoá user", error });
  }
};



export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,

};
