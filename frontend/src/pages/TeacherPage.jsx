import React, { useState } from "react";
import TeacherList from "../components/TeacherList";
import CreateTeacherForm from "../components/CreateTeacherForm";


const TeacherPage = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">📋 Danh sách giáo viên</h2>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          ➕ Tạo mới
        </button>
      </div>

      {/* ❗ Modal chỉ hiển thị khi openModal = true */}
      {openModal && <CreateTeacherForm onClose={() => setOpenModal(false)} />}

      <TeacherList />
    </div>
  );
};

export default TeacherPage;
