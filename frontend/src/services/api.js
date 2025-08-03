import axios from "axios";

const API_BASE = "http://localhost:5000/api"; // đúng BE local

export const getTeachers = (page) =>
  axios.get(`${API_BASE}/teachers?page=${page}&limit=5`);

export const getPositions = () => axios.get(`${API_BASE}/teacher-positions`);

export const createPosition = (data) =>
  axios.post(`${API_BASE}/teacher-positions`, data);

export const createTeacher = (data) =>
  axios.post(`${API_BASE}/teachers`, data);

export const updateTeacher = (id, data) =>
  axios.put(`${BASE_URL}/teachers/${id}`, data);

