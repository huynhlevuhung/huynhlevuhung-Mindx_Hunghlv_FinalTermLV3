import axios from "axios";

const API_BASE = "http://localhost:5005/api";

// Lấy danh sách giáo viên
export const getTeachers = (page) =>
  axios.get(`${API_BASE}/teachers?page=${page}&limit=5`);

// Lấy chi tiết 1 giáo viên
export const getTeacherById = async (id) => {
  return await axios.get(`${API_BASE}/teachers/${id}`);
};

// Lấy danh sách vị trí công tác
export const getPositions = () => axios.get(`${API_BASE}/teacher-positions`);

// Tạo mới vị trí công tác
export const createPosition = (data) =>
  axios.post(`${API_BASE}/teacher-positions`, data);

// Tạo mới giáo viên
export const createTeacher = (formData, config) =>
  axios.post(`${API_BASE}/teachers`, formData, config);

// Cập nhật giáo viên
export const updateTeacher = (id, data) =>
  axios.put(`${API_BASE}/teachers/${id}`, data);

// Xóa vị trí công tác
export const deletePosition = (id) =>
  axios.delete(`${API_BASE}/teacher-positions/${id}`);

// Cập nhật vị trí công tác
export const updatePosition = (id, updatedData) =>
  axios.put(`${API_BASE}/teacher-positions/${id}`, updatedData);
