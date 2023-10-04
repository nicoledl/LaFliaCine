import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { Avatar, Link } from "@mui/material";
import "./navbar.css";
import axios from "axios";
import { useEffect, useState } from "react";

const verifyToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_VERIFY_URL}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return true;
  } catch (error) {
    console.error("Error de verificación de token:", error);
    return false;
  }
};

const pages = [
  { name: "Peliculas", href: "movies" },
  { name: "Series", href: "series" },
  { name: "Ingresar", href: "login" },
  { name: "Registrarse", href: "signup" },
];
const settings = [
  { name: "Perfil", href: "profile" },
  { name: "Favoritos", href: "favorites" },
  { name: "Vistos", href: "seen" },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [action, setAction] = useState(false);

  useEffect(() => {
    verifyToken()
      .then((result) => {
        setIsAuthenticated(result);
      })
      .catch((error) => {
        console.error(error);
        setIsAuthenticated(false);
      });
  }, [action]);

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

  return (
    <AppBar
      position="static"
      className=""
      sx={{
        background: "#ba2113",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TheaterComedyIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Link
            href="/"
            sx={{
              mr: 4,
              display: { xs: "none", md: "flex" },
              fontSize: "1.5em",
              fontFamily: "'Ultra', serif",
              letterSpacing: "2px",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            La Flia Cine
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
                if (
                  (page.name.includes("Ingresar") ||
                    page.name.includes("Registrarse")) &&
                  isAuthenticated
                ) {
                  return "";
                }

                return (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Link
                      key={page.href}
                      href={`/${page.href}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Typography
                        textAlign="center"
                        sx={{ fontFamily: "'M PLUS Rounded 1c', sans-serif" }}
                      >
                        {page.name}
                      </Typography>
                    </Link>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
          <TheaterComedyIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="h5"
            href=""
            sx={{
              fontFamily: "'Ultra', serif",
              letterSpacing: "2px",
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link href="/" style={{ textDecoration: "none", color: "#fff" }}>
              La Flia Cine
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              if (
                (page.name.includes("Ingresar") ||
                  page.name.includes("Registrarse")) &&
                isAuthenticated
              ) {
                return "";
              }

              return (
                <Link
                  key={page.name}
                  href={`/${page.href}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    key={page.href}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      fontFamily: "'M PLUS Rounded 1c', sans-serif",
                    }}
                  >
                    {page.name}
                  </Button>
                </Link>
              );
            })}
          </Box>

          {isAuthenticated && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
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
                {settings.map((setting) => (
                  <Link
                    key={setting.name}
                    href={`/${setting.href}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  </Link>
                ))}
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("token");
                    setAction(!action);
                  }}
                >
                  Salir
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
