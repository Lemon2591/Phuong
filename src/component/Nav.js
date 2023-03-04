import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const data = JSON.parse(localStorage.getItem("user"));
  const dataInfo = JSON.parse(localStorage.getItem("info"));
  return (
    <div className="nav-profile">
      <ul style={{ justifyContent: "flex-end" }}>
        <li style={{ margin: "0 40px" }}>
          <NavLink style={{ color: "#000" }} to="/home">
            {" "}
            Đặt lịch
          </NavLink>
        </li>
        <li style={{ margin: "0 40px" }}>
          <NavLink style={{ color: "#000" }} to="/profile">
            {" "}
            Thông tin
          </NavLink>
        </li>
        <li style={{ margin: "0 40px" }}>
          <NavLink style={{ color: "#000" }} to="/booking">
            {" "}
            Lịch đặt
          </NavLink>
        </li>
      </ul>
      <ul style={{ justifyContent: "flex-end" }} className="out">
        <div style={{ display: "flex" }} className="text">
          <span className="log-out" onClick={handleLogout}>
            Đăng xuất
          </span>
          <li style={{ marginRight: "10px" }}>Xin chào:</li>
          <li>{dataInfo ? dataInfo.fullName : data.userName}</li>
        </div>
      </ul>
    </div>
  );
}

export default Nav;
