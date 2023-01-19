import { createTheme } from "@mui/material/styles";
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
      main: "#CED1DC",
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
});

export default theme;
