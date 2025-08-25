import React, { useState } from "react";
import { createPosition } from "../services/api";

const CreatePositionForm = () => {


  const [form, setForm] = useState({ name: "", code: "", des: "", isActive: true });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPosition(form);
      alert("Tạo thành công!");
      window.location.reload(); // reload lại danh sách
    } catch (err) {
      console.error("Lỗi tạo vị trí:", err);
      alert("Tạo thất bại! Kiểm tra 'code' có trùng không.");
    }
  };


  return;
};

export default CreatePositionForm;