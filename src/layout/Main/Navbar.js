import { Button, Container, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import * as React from "react";
import { IoNotificationsOutline, IoNotificationsSharp } from "react-icons/io5";
import { RiHome6Fill, RiHome6Line, RiSearch2Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import user from "../../images/user.jpg";
import styles from "../../styles/Navbar.module.scss";

const paths = [
  {
    path: "/home",
    icon: <RiHome6Line />,
    activeIcon: <RiHome6Fill />,
    label: "Home",
  },
  {
    path: "/explore",
    icon: <RiSearch2Line />,
    activeIcon: <RiSearch2Line />,
    label: "Explore",
  },
  {
    path: "/notifications",
    icon: <IoNotificationsOutline />,
    activeIcon: <IoNotificationsSharp />,
    label: "Notifications",
  },
];

// navbar
const Navbar = () => {
  const [active, setActive] = React.useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNavClick = (path) => {
    navigate(path);
    setActive(!active);
  };

  const mobileMenu = (
    <Box
      sx={{
        px: 2,
        py: 1,
        bgcolor: "info.main",
        borderRadius: "25px 25px 0px 0px",
        width: "100%",
      }}
    >
      <nav
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        {paths.map((item) => (
          <Button
            onClick={() => handleNavClick(item.path)}
            startIcon={pathname === item.path ? item.activeIcon : item.icon}
            sx={{
              textTransform: "capitalize",
              color: pathname === item.path ? "primary" : "#afb1ba",
              fontWeight: pathname === item.path ? 700 : 500,
              flexDirection: "column",
            }}
            variant="text"
            key={item.label}
          >
            {item.label}
          </Button>
        ))}
        {/* user  */}
        <Box
          onClick={() => handleNavClick("/profile")}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            ml: 1,
          }}
          className={styles.user}
        >
          <img src={user} alt="" />
          <Typography
            variant="body2"
            sx={{
              color: pathname === "/profile" ? "primary.main" : "#afb1ba",
              fontWeight: pathname === "/profile" ? 700 : 500,
            }}
          >
            Profile
          </Typography>
        </Box>
      </nav>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          bgcolor: "transparent",
          boxShadow: 0,
          display: { xs: "none", md: "block" },
        }}
      >
        <Toolbar>
          <Container>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "info.main",
                py: 2,
                px: 4,
                mt: 1,
                borderRadius: "25px",
                boxShadow: 1,
              }}
            >
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <nav
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {paths.map((item) => (
                    <Button
                      onClick={() => handleNavClick(item.path)}
                      startIcon={
                        pathname === item.path ? item.activeIcon : item.icon
                      }
                      sx={{
                        textTransform: "capitalize",
                        color: pathname === item.path ? "primary" : "#afb1ba",
                        fontWeight: pathname === item.path ? 700 : 500,
                      }}
                      variant="text"
                      key={item.label}
                    >
                      {item.label}
                    </Button>
                  ))}
                  {/* user  */}
                  <Box
                    onClick={() => handleNavClick("/profile")}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                    className={styles.user}
                  >
                    <img src={user} alt="" />
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          pathname === "/profile" ? "primary.main" : "#afb1ba",
                        fontWeight: pathname === "/profile" ? 700 : 500,
                      }}
                    >
                      Profile
                    </Typography>
                  </Box>
                </nav>
              </Box>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          display: { xs: "block", md: "none" },
          width: "100%",
          zIndex: 999,
        }}
      >
        {mobileMenu}
      </Box>
    </Box>
  );
};

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
