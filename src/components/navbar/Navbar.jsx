import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
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
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
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
    // window.addEventListener("beforeunload", function (event) {
    //   handleSignOut();
    // });
  }, [location]);

  const handleSignOut = async () => {
    await logout();
    localStorage.setItem("token", "");
    localStorage.setItem("isLoggedIn", false);
    navigate("/login");
  };
  const isSecretary = localStorage.getItem("role") === "secretary";
  const username = localStorage.getItem("username");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return (
    <>
      {showNav && isLoggedIn && (
        <>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar className="d-flex justify-content-between align-content-center">
              <div>
                <img src={require('../../media/logo-old-wide-01_s.png')} alt="logo" className="logo" />
              </div>
              <div className="text-end text-dark">
                <h5 className="m-0">Welcome, {username && username}</h5>
                {/* <p className="m-0">{localStorage.getItem("username")}</p> */}
              </div>
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
                        color={`${active === "/" ? "primary" : "action"}`}
                      />
                    </ListItemIcon>
                    <ListItemText primary={"الموظفين"} />
                  </ListItemButton>
                </ListItem>
                {!isSecretary && (<>
                  <ListItem onClick={() => navigate("/accounting")}>
                    <ListItemButton>
                      <ListItemIcon>
                        <PaidIcon
                          color={`${active.includes("/accounting") ? "primary" : "action"
                            }`}
                        />
                      </ListItemIcon>
                      <ListItemText primary={"الحسابات"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem onClick={() => navigate("/loans")}>
                    <ListItemButton>
                      <ListItemIcon>
                        <AccountBalanceWalletIcon
                          color={`${active.includes("/loans") ? "primary" : "action"
                            }`}
                        />
                      </ListItemIcon>
                      <ListItemText primary={"الديون"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem onClick={() => navigate("/salaries")}>
                    <ListItemButton>
                      <ListItemIcon>
                        <CurrencyExchangeIcon
                          color={`${active.includes("/salaries") ? "primary" : "action"
                            }`}
                        />
                      </ListItemIcon>
                      <ListItemText primary={"المرتبات"} />
                    </ListItemButton>
                  </ListItem>
                  </>
                )}
                <ListItem onClick={() => navigate("/shifts")}>
                  <ListItemButton>
                    <ListItemIcon>
                      <DirectionsBoatIcon
                        color={`${active === "/shifts" ? "primary" : "action"}`}
                      />
                    </ListItemIcon>
                    <ListItemText primary={"الورديات"} />
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
