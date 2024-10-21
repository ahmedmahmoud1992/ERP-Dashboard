import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleSidebar } from "../../redux/UI/UISlice";

import { Badge, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle, Mail, Notifications, MenuOutlined } from "@mui/icons-material";
import { useState, type MouseEvent } from "react";

const AppBar = () => {
    
    const dispatch = useAppDispatch();
    const { isMobile } = useAppSelector((state) => state.ui);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
      };
      const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const handleMenuClose = () => {
        setAnchorEl(null);
      };

      const menuId = "primary-search-account-menu";
      const isMenuOpen = Boolean(anchorEl);
      const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
      );
  return (
    <>
    <div className="app-bar">
          {isMobile && (
            <button className="menu-btn" onClick={handleToggleSidebar}>
              <MenuOutlined />
            </button>
          )}
          <Box>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={'3+'} color="error">
                <Mail />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={'9+'} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </div>
          {renderMenu}
        </>
  )
}

export default AppBar