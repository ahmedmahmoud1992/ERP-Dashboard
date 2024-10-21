import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FaUsers, FaChartPie, FaCog } from "react-icons/fa";
import { toggleSidebar } from "../../redux/UI/UISlice";
import { NavLink } from "react-router-dom";
const AsideNav = () => {
  const dispatch = useAppDispatch();
  const { isSidebarOpen, isMobile } = useAppSelector((state) => state.ui);
  const closeSidebar = () => {
    if (isMobile) dispatch(toggleSidebar());
  };

  const linkStyle = {
    color: "unset",
    textDecoration: "none",
    display: "flex",
    gap: "20px",
  };
  return (
    <>
      <aside
        className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}
        onClick={closeSidebar}
      >
        <div className="logo">
          <img src="/logo.png" alt="ERP Dash" style={{}} />
        </div>
        <nav>
          <NavLink className={({isActive}) => isActive? 'active': ''} to="/" style={linkStyle}>
            <FaChartPie />
            <span>Dashboard</span>
          </NavLink>
          <NavLink className={({isActive}) => isActive? 'active': ''} to="/teams" style={linkStyle}>
            <FaUsers />
            <span>Teams</span>
          </NavLink>
          <NavLink className={({isActive}) => isActive? 'active': ''} to="/employees" style={linkStyle}>
            <FaUsers />
            <span>Employees</span>
          </NavLink>
          <NavLink className={({isActive}) => isActive? 'active': ''} to="/settings" style={linkStyle}>
            <FaCog />
            <span>Settings</span>
          </NavLink>
        </nav>
      </aside>
      <div
        className={`backdrop ${isSidebarOpen && isMobile ? "visible" : ""}`}
        onClick={closeSidebar}
      ></div>
    </>
  );
};

export default AsideNav;
