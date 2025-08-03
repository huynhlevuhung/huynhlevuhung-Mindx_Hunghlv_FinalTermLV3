import React, { useEffect, useState } from "react";
import { getPositions } from "../services/api";

const PositionList = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPositions();
        setPositions(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy vị trí:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-4">
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">#</th>
            <th className="p-2">Tên</th>
            <th className="p-2">Code</th>
            <th className="p-2">Mô tả</th>
            <th className="p-2">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((pos, i) => (
            <tr key={pos._id} className="border-t">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{pos.name}</td>
              <td className="p-2">{pos.code}</td>
              <td className="p-2">{pos.des}</td>
              <td className="p-2">{pos.isActive ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PositionList;
