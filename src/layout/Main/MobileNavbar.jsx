import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
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
const MobileNavbar = () => {
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
    <Box sx={{ display: "flex", pt: 10 }}>
      <CssBaseline />

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          zIndex: 999,
        }}
      >
        {mobileMenu}
      </Box>
    </Box>
  );
};

export default MobileNavbar;
