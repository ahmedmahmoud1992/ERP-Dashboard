import { useEffect, useCallback } from "react";
import AsideNav from "../components/ui/AsideNav";
import { useAppDispatch } from "../redux/hooks";
import { setIsMobile } from "../redux/UI/UISlice";
import AppBar from "../components/ui/AppBar";
import { Outlet } from "react-router-dom";

const EmployeesDashboard = () => {
  const dispatch = useAppDispatch();

  // Memoized resize handler
  const handleResize = useCallback(() => {
    const isMobileView = window.innerWidth <= 768;
    dispatch(setIsMobile(isMobileView));
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <div className="main-container">
      <AsideNav />
      <div className="page-content">
        <AppBar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmployeesDashboard;
