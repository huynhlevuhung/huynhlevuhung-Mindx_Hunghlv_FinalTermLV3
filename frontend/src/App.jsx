import React from "react";
import TeacherPage from "./pages/TeacherPage";
import PositionPage from "./pages/PositionPage";

function App() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-12">
      <h1 className="text-3xl font-bold text-center text-blue-700 uppercase">
        Teacher Management System
      </h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">👩‍🏫 Quản lý giáo viên</h2>
        <TeacherPage />
      </section>

      <hr className="my-6" />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">📌 Quản lý vị trí công tác</h2>
        <PositionPage />
      </section>
    </div>
  );
}

export default App;
