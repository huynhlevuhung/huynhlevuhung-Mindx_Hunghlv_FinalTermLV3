import React, { useEffect, useState } from "react";
import { getTeachers } from "../services/api";
import CreateTeacherForm from "./CreateTeacherForm";

const TeacherList = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const res = await getTeachers(page);
      // ✅ lấy đúng mảng teachers
      setTeachers(res.data.data);
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
          {Array.isArray(teachers) && teachers.length > 0 ? (
            teachers.map((t) => (
              <tr key={t.code} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-800">{t.code}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://i.pravatar.cc/40?u=${t.userId?.email}`}
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{t.userId?.name}</p>
                      <p className="text-sm text-gray-500">{t.userId?.email}</p>
                      <p className="text-sm text-gray-500">{t.userId?.phoneNumber}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2 text-gray-700">
                  {t.degrees?.length > 0 && (
                    <>
                      <div>
                        <b>Bậc:</b> {t.degrees.at(-1).type}
                      </div>
                      <div>
                        <b>Chuyên ngành:</b> {t.degrees.at(-1).major}
                      </div>
                    </>
                  )}
                </td>
                <td className="px-4 py-2 text-gray-500 italic">N/A</td>
                <td className="px-4 py-2">
                  {t.teacherPositionsId?.map((pos) => pos.name).join(", ") || "-"}
                </td>
                <td className="px-4 py-2">{t.userId?.address || "-"}</td>
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
                      setSelectedTeacher(t);
                      setOpenForm(true);
                    }}
                  >
                    👁 Chi tiết
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4 text-gray-500">
                Không có giáo viên nào
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
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

      {/* Form chỉnh sửa */}
      {openForm && selectedTeacher && (
        <CreateTeacherForm
          mode="edit"
          teacherData={{
            _id: selectedTeacher._id,
            name: selectedTeacher.userId?.name || "",
            email: selectedTeacher.userId?.email || "",
            phoneNumber: selectedTeacher.userId?.phoneNumber || "",
            identity: selectedTeacher.userId?.identity || "",
            address: selectedTeacher.userId?.address || "",
            dob: selectedTeacher.userId?.dob || "",
            degrees: selectedTeacher.degrees || [],
            teacherPositions: selectedTeacher.teacherPositions || [],
            avatarUrl: `https://i.pravatar.cc/120?u=${selectedTeacher.userId?.email}`,
          }}
          onClose={() => {
            setOpenForm(false);
            setSelectedTeacher(null);
          }}
        />
      )}
    </div>
  );
};

export default TeacherList;
