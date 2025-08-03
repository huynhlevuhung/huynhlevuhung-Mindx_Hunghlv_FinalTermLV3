const User = require("../models/User");

// [GET] /users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách user", error });
  }
};

module.exports = {
  getAllUsers,
};
    