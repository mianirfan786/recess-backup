import { createTheme } from "@mui/material/styles";
import HellixBold from "../fonts/Hellix-Bold.ttf";
import HellixMedium from "../fonts/Hellix-Medium.ttf";
import HellixRegular from "../fonts/Hellix-Regular.ttf";
import "../styles/fonts.scss";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2DC6FF",
    },
    secondary: {
      main: "#80cad3",
    },
    error: {
      main: "#ff0000",
    },
    info: {
      main: "#fff",
    },
    text: {
      primary: "#000",
      secondary: "#111315",
    },
    divider: "#2dc6ff",
  },
  typography: {
    fontFamily: ["HellixRegular", "HellixMedium", "HellixBold"].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@font-face": [HellixRegular, HellixMedium, HellixBold].map((font) => ({
          fontFamily: font.fontFamily,
          src: `url(${font.src})`,
          fontWeight: font.fontWeight,
          fontStyle: font.fontStyle,
        })),
      },
    },
  },
});

theme.typography.h3 = {
  fontFamily: "HellixMedium",
  fontSize: "24px",

  [theme.breakpoints.up("md")]: {
    fontSize: "36px",
  },
};
theme.typography.h4 = {
  fontFamily: "HellixMedium",
  fontSize: "20px",
  fontWeight: "500",

  [theme.breakpoints.up("md")]: {
    fontSize: "24px",
  },
};
theme.typography.h5 = {
  fontFamily: "HellixMedium",
  fontSize: "17px",
  fontWeight: "500",

  [theme.breakpoints.up("md")]: {
    fontSize: "20px",
  },
};
theme.typography.h6 = {
  fontFamily: "HellixMedium",
  fontSize: "14px",
  fontWeight: "500",

  [theme.breakpoints.up("md")]: {
    fontSize: "16px",
  },
};
theme.typography.body1 = {
  fontFamily: "HellixRegular",
  fontSize: "14px",
  fontWeight: "400",

  [theme.breakpoints.up("md")]: {
    fontSize: "16px",
  },
};
theme.typography.body2 = {
  fontFamily: "HellixRegular",
  fontSize: "12px",
  fontWeight: "400",

  [theme.breakpoints.up("md")]: {
    fontSize: "14px",
  },
};

theme.components.MuiButton = {
  styleOverrides: {
    root: {
      textTransform: "none",
      fontFamily: "HellixMedium",
      fontSize: "14px",
      fontWeight: "500",
    },
    contained: {
      color: "#fff",
    },
    text: {
      fontSize: "14px",
      fontWeight: "500",
      [theme.breakpoints.up("md")]: {
        fontSize: "16px",
      },
    },
  },
};

export default theme;
