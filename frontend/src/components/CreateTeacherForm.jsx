import React, { useEffect, useState } from "react";
import { createTeacher, getPositions } from "../services/api";

const CreateTeacherForm = ({ onClose, mode = "create", teacherData = null }) => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    identity: "",
    dob: "",
    degrees: [],
    teacherPositions: [],
    avatar: null,
  });

  const [preview, setPreview] = useState(null);
  const [degree, setDegree] = useState({
    type: "",
    school: "",
    major: "",
    isGraduated: false,
  });

  const [positions, setPositions] = useState([]);

  useEffect(() => {
    getPositions().then((res) => setPositions(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, avatar: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDegreeChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDegree({ ...degree, [name]: type === "checkbox" ? checked : value });
  };

  const handleAddDegree = () => {
    if (degree.type && degree.school && degree.major) {
      setForm({ ...form, degrees: [...form.degrees, degree] });
      setDegree({ type: "", school: "", major: "", isGraduated: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      teacherPositions: form.teacherPositions,
      degrees: form.degrees,
    };
    try {
      await createTeacher(payload);
      alert("Tạo giáo viên thành công!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Tạo thất bại!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-12 z-50">
      <div className="bg-white w-[90%] max-w-5xl p-6 rounded shadow relative">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Tạo thông tin giáo viên</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Thông tin cá nhân */}
          <div>
            <div className="flex items-start gap-6">
              <div className="flex flex-col items-center">
                <img
                  src={preview || "https://i.pravatar.cc/120?u=random"}
                  className="w-28 h-28 rounded-full border object-cover"
                  alt="avatar"
                />
                <label className="text-sm mt-2 text-blue-600 cursor-pointer text-center">
                  Upload file <br />
                  <span className="underline">Chọn ảnh</span>
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </label>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4 border-l pl-6">
                <div>
                  <label className="text-sm font-medium">* Họ và tên</label>
                  <input
                    name="name"
                    onChange={handleChange}
                    required
                    placeholder="VD: Nguyễn Văn A"
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">* Ngày sinh</label>
                  <input
                    type="date"
                    name="dob"
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">* Số điện thoại</label>
                  <input
                    name="phoneNumber"
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">* Email</label>
                  <input
                    name="email"
                    type="email"
                    onChange={handleChange}
                    placeholder="example@school.edu.vn"
                    className="mt-1 p-2 border rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">* Số CCCD</label>
                  <input
                    name="identity"
                    onChange={handleChange}
                    placeholder="Nhập số CCCD"
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">* Địa chỉ</label>
                  <input
                    name="address"
                    onChange={handleChange}
                    placeholder="Địa chỉ thường trú"
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr />

          {/* Vị trí công tác */}
          <div>
            <label className="text-sm font-medium">* Vị trí công tác</label>
            <select
              multiple
              value={form.teacherPositions}
              onChange={(e) =>
                setForm({
                  ...form,
                  teacherPositions: Array.from(e.target.selectedOptions, (opt) => opt.value),
                })
              }
              className="w-full mt-1 p-2 border rounded h-28"
            >
              {positions.map((p) => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>
          </div>

          <hr />

          {/* Học vị */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-sm">Học vị</h3>
              <button
                type="button"
                onClick={handleAddDegree}
                className="text-blue-600 text-sm hover:underline"
              >
                Thêm
              </button>
            </div>

            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Bậc</th>
                  <th className="p-2">Trường</th>
                  <th className="p-2">Chuyên ngành</th>
                  <th className="p-2">Tốt nghiệp</th>
                </tr>
              </thead>
              <tbody>
                {form.degrees.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-400">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
                        alt="empty"
                        className="mx-auto w-10 h-10 opacity-40"
                      />
                      <div className="text-sm mt-2">Trống</div>
                    </td>
                  </tr>
                ) : (
                  form.degrees.map((deg, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2">{deg.type}</td>
                      <td className="p-2">{deg.school}</td>
                      <td className="p-2">{deg.major}</td>
                      <td className="p-2 text-center">{deg.isGraduated ? "✅" : "❌"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="grid grid-cols-4 gap-2 mt-3">
              <input
                name="type"
                value={degree.type}
                onChange={handleDegreeChange}
                placeholder="Bậc"
                className="p-2 border rounded"
              />
              <input
                name="school"
                value={degree.school}
                onChange={handleDegreeChange}
                placeholder="Trường"
                className="p-2 border rounded"
              />
              <input
                name="major"
                value={degree.major}
                onChange={handleDegreeChange}
                placeholder="Chuyên ngành"
                className="p-2 border rounded"
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="isGraduated"
                  checked={degree.isGraduated}
                  onChange={handleDegreeChange}
                />
                Tốt nghiệp
              </label>
            </div>
          </div>

          {/* Nút lưu */}
          <div className="text-right mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              💾 Lưu
            </button>
          </div>
        </form>

        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default CreateTeacherForm;
