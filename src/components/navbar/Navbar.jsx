import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupsIcon from "@mui/icons-material/Groups";
import PaidIcon from "@mui/icons-material/Paid";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth.service";

const drawerWidth = 240;

export default function Navbar() {
  const [showNav, setShowNav] = useState(true);
  const [active, setActive] = useState("/");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const path = location.pathname;
    setShowNav(path !== "/login");
    setActive(path);
  }, [location]);

  const handleSignOut = () => {
    // await logout();
    localStorage.setItem('token','');
    localStorage.setItem("isLoggedIn", false);
    navigate('/login');

  };
  const isLoggedIn = localStorage.getItem('isLoggedIn')==="true";
  return (
    <>
      {(showNav &&isLoggedIn ) &&(
        <>
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                System
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
              <List>
                <ListItem onClick={() => navigate("/")}>
                  <ListItemButton>
                    <ListItemIcon>
                      <GroupsIcon
                        color={`${
                          active === "/" ? "primary" : "action"
                        }`}
                      />
                    </ListItemIcon>
                    <ListItemText primary={"الموظفين"} />
                  </ListItemButton>
                </ListItem>
                <ListItem onClick={() => navigate("/accounting")}>
                  <ListItemButton>
                    <ListItemIcon>
                      <PaidIcon
                        color={`${
                          active === "/accounting" ? "primary" : "action"
                        }`}
                      />
                    </ListItemIcon>
                    <ListItemText primary={"الحسابات"} />
                  </ListItemButton>
                </ListItem>
                <ListItem onClick={() => navigate("/shifts")}>
                  <ListItemButton>
                    <ListItemIcon>
                      <DirectionsBoatIcon
                        color={`${active === "/shifts" ? "primary" : "action"}`}
                      />
                    </ListItemIcon>
                    <ListItemText primary={"الشفتات"} />
                  </ListItemButton>
                </ListItem>

                <ListItem onClick={handleSignOut}>
                  <ListItemButton>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={"تسجيل الخروج"} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </>
      )}
    </>
  );
}