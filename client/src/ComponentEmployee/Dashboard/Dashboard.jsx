import React, { useState } from "react";
import "./Dashboard.css";
import Content from "./DashboardSubComponent/Content/Content";

function Dashboard() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="dashboard-container">
      <div className={`main-content ${isSidebarVisible ? "dimmed" : ""}`}>
        <Content />
      </div>
    </div>
  );
}

export default Dashboard;


