import React, { useState } from "react";
import { createPosition } from "../services/api";

const CreatePositionForm = () => {
  const [form, setForm] = useState({ name: "", code: "", des: "" });

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

  return (
    <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-3 gap-4">
      <input
        name="name"
        placeholder="Tên vị trí"
        className="p-2 border rounded"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="code"
        placeholder="Mã code (duy nhất)"
        className="p-2 border rounded"
        value={form.code}
        onChange={handleChange}
        required
      />
      <input
        name="des"
        placeholder="Mô tả"
        className="p-2 border rounded"
        value={form.des}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        ➕ Thêm vị trí công tác
      </button>
    </form>
  );
};

export default CreatePositionForm;
