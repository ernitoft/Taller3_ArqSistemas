import * as React from "react";
import { Button, Container, Typography, Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { logout } from "../../features/account/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../features/auth/assets/icon.png";
import MenuIcon from "@mui/icons-material/Menu";

/**
 * @description
 * Este componente define la barra de navegación de la aplicación.
 * @returns {React.Component}
 */

const Navbar = () => {
  const pages = ["Usuarios", "Estacionamientos", "Reportes"];
  const [auth, setAuth] = React.useState(true);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUsers = () => {
    navigation("/main/users");
  };

  const handleParkings = () => {
    navigation("/main/parkings");
  };

  const handleReports = () => {
    navigation("/main/report");
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <AppBar position="static" sx={{ background: "#d8ebe5" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={logo}
            width={52}
            height={46}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => {
                let handleClick;
                if (page === "Usuarios") {
                  handleClick = handleUsers;
                } else if (page === "Estacionamientos") {
                  handleClick = handleParkings;
                } else {
                  handleClick = handleReports;
                }
                return (
                  <MenuItem key={page} onClick={handleClick}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              let handleClick;
              if (page === "Usuarios") {
                handleClick = handleUsers;
              } else if (page === "Estacionamientos") {
                handleClick = handleParkings;
              } else {
                handleClick = handleReports;
              }
              return (
                <Button
                  key={page}
                  onClick={handleClick}
                  sx={{ my: 2, color: "#163f35", display: "block" }}
                >
                  {page}
                </Button>
              );
            })}
          </Box>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenUserMenu}
                color="#163f35"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
