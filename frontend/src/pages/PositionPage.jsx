import React from "react";
import PositionList from "../components/PositionList";
import CreatePositionForm from "../components/CreatePositionForm";

const PositionPage = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📋 Danh sách vị trí công tác</h2>
      <CreatePositionForm />
      <PositionList />
    </div>
  );
};

export default PositionPage;
