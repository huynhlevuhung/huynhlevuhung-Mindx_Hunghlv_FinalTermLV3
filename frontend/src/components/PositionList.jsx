import React, { useEffect, useState } from "react";
import { getPositions, createPosition, deletePosition } from "../services/api";



const PositionList = () => {
  const [positions, setPositions] = useState([]);
  const [newPosition, setNewPosition] = useState({ name: "", code: "", des: "" });

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      const res = await getPositions();
      setPositions(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy vị trí:", err);
    }
  };

  const handleChange = (e) => {
    setNewPosition({ ...newPosition, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newPosition.name || !newPosition.code) {
      alert("Tên và mã là bắt buộc.");
      return;
    }
    try {
      const res = await createPosition(newPosition);
      setPositions([...positions, res.data]); // cập nhật danh sách ngay
      setNewPosition({ name: "", code: "", des: "" }); // reset form
    } catch (err) {
      console.error("Lỗi tạo vị trí:", err);
      alert("Tạo thất bại. Có thể mã bị trùng.");
    }
  };

  const handleDelete = async (pos) => {
    if (confirm("Bạn có chắc muốn xoá?")) {
      try {
        await deletePosition(pos._id);
        alert("Đã xoá!");
        fetchPositions(); // Gọi lại để cập nhật danh sách
      } catch (err) {
        console.error("Lỗi xoá vị trí:", err);
      }
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleAdd} className="mb-4 grid grid-cols-3 gap-2">
        <input
          name="name"
          placeholder="Tên vị trí"
          value={newPosition.name}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          name="code"
          placeholder="Mã (duy nhất)"
          value={newPosition.code}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          name="des"
          placeholder="Mô tả"
          value={newPosition.des}
          onChange={handleChange}
          className="p-2 border rounded col-span-1"
        />
        <button
          type="submit"
          className="col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          ➕ Thêm vị trí
        </button>
      </form>

      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">#</th>
            <th className="p-2">Tên</th>
            <th className="p-2">Code</th>
            <th className="p-2">Mô tả</th>
            <th className="p-2">Trạng thái</th>
            <th className="p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((pos, i) => (
            <tr key={pos._id} className="border-t">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{pos.name}</td>
              <td className="p-2">{pos.code}</td>
              <td className="p-2">{pos.des}</td>
              <td className="p-2">
                {pos.isActive ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                    Đang công tác
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs font-semibold">
                    Ngưng hoạt động
                  </span>
                )}
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(pos)} // 
                  className="text-red-600 hover:underline text-sm"


                >
                  ❌ Xoá
                </button>
              </td>
            </tr>
          ))}
          {positions.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center text-gray-500 p-4">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PositionList;