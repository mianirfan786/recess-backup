import { createTheme } from "@mui/material/styles";
import "../styles/fonts.scss";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2dc6ff",
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
});

export default theme;
