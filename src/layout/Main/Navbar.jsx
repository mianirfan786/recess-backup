import {Button, Container} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import {HiOutlineUser, HiUser} from "react-icons/hi";
import {IoNotificationsOutline, IoNotificationsSharp} from "react-icons/io5";
import {RiHome6Fill, RiHome6Line, RiSearch2Line} from "react-icons/ri";
import {useLocation, useNavigate} from "react-router-dom";

const paths = [
    {
        path: "/home",
        icon: <RiHome6Line/>,
        activeIcon: <RiHome6Fill/>,
        label: "Home",
    },
    {
        path: "/explore",
        icon: <RiSearch2Line/>,
        activeIcon: <RiSearch2Line/>,
        label: "Explore",
    },
    {
        path: "/notifications",
        icon: <IoNotificationsOutline/>,
        activeIcon: <IoNotificationsSharp/>,
        label: "Notifications",
    },
    {
        path: "/profile",
        icon: <HiOutlineUser/>,
        activeIcon: <HiUser/>,
        label: "Profile",
    },
];

// navbar
const Navbar = () => {
    const [active, setActive] = React.useState(false);

    const navigate = useNavigate();
    const {pathname} = useLocation();

    const handleNavClick = (path) => {
        navigate(path);
        setActive(!active);
    };

    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline/>
            <AppBar
                position="static"
                sx={{
                    bgcolor: "transparent",
                    boxShadow: 0,
                    display: {xs: "none", sm: "block"},
                }}
            >
                <Toolbar>
                    <Container>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: {xs: "none", sm: "flex"},
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
                            <Box sx={{display: {xs: "none", sm: "block"}}}>
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
                                </nav>
                            </Box>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
