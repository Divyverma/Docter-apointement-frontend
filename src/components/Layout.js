import React from "react";
import "../styles/Layout.css";
import { Badge, message } from "antd";
import { adminMenu, userMenu } from "../Data/Data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

 

  // doctor menu
  const doctorMenu=[
    {
        name:'Home',
        path:'/',
        icon: 'fa-solid fa-house'
    },
    {
        name:'Appointments',
        path:'/apointments',
        icon: 'fa-solid fa-list'
    },
    {
        name:'Profile',
        path:`/doctor/profile/${user?._id}`,
        icon: 'fa-solid fa-user'
    },
  ]

   //redering menu list
   const SideBarMenu = user?.isAdmin ? adminMenu : user?.isDocter ? doctorMenu : userMenu;

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>DOC APP</h6>
              <hr />
            </div>
            <div className="menu">
              {SideBarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;

                return (
                  <>
                    <div className={`menu-item ${isActive && "active"} `}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item `} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{cursor:'pointer'}}>
                <Badge
                  count={user && user.notification.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                  
                >
                  <i class="fa-solid fa-bell" ></i>
                </Badge>
                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
