import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2></h2>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/users">User</Link></li>
        <li><Link to="/view_templates">Templates</Link></li>
        <li><Link to="/view_frames">Frames</Link></li>
        <li><Link to="/viewbanner">Banner</Link></li>
        <li><Link to="/feedback">Feedbacks</Link></li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
