import React, { useState } from "react";
import './Notification.css'

function Notifications() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="notification-container">
      <div className={`main-content ${isSidebarVisible ? "dimmed" : ""}`}>
        <p>agdhfyj</p>
      </div>
    </div>
  );
}

export default Notifications;
