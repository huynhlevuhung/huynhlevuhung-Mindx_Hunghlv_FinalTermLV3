import React, { useEffect, useState } from "react";
import { getTeachers } from "../services/api";
import CreateTeacherForm from "./CreateTeacherForm";
const [openForm, setOpenForm] = useState(false);
const [selectedTeacher, setSelectedTeacher] = useState(null);

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const res = await getTeachers(page);
      setTeachers(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy giáo viên:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border rounded-lg shadow">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">Mã</th>
            <th className="px-4 py-2">Giáo viên</th>
            <th className="px-4 py-2">Trình độ (cao nhất)</th>
            <th className="px-4 py-2">Bộ môn</th>
            <th className="px-4 py-2">TT Công tác</th>
            <th className="px-4 py-2">Địa chỉ</th>
            <th className="px-4 py-2">Trạng thái</th>
            <th className="px-4 py-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t, i) => (
            <tr key={t.code} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2 text-gray-800">{t.code}</td>
              <td className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <img
                    src={`https://i.pravatar.cc/40?u=${t.user?.email}`}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />

                  <div>
                    <p className="font-medium">{t.user?.name}</p>
                    <p className="text-sm text-gray-500">{t.user?.email}</p>
                    <p className="text-sm text-gray-500">{t.user?.phoneNumber}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2 text-gray-700">
                {t.degrees?.length > 0 && (
                  <>
                    <div><b>Bậc:</b> {t.degrees.at(-1).type}</div>
                    <div><b>Chuyên ngành:</b> {t.degrees.at(-1).major}</div>
                  </>
                )}
              </td>
              <td className="px-4 py-2 text-gray-500 italic">N/A</td>
              <td className="px-4 py-2">
                {t.teacherPositions?.map((p) => p.name).join(", ") || "-"}
              </td>
              <td className="px-4 py-2">{t.user?.address || "-"}</td>
              <td className="px-4 py-2">
                {t.isActive ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                    Đang công tác
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs">
                    Ngưng hoạt động
                  </span>
                )}
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => {
                    setSelectedTeacher(teacher); // truyền data giáo viên cần sửa
                    setOpenForm(true); // mở Drawer/Form
                  }}
                >
                  👁 Chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4 text-sm">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Trang trước
        </button>
        <span>Trang {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Trang sau →
        </button>
      </div>
    </div>
  );
};

export default TeacherList;
