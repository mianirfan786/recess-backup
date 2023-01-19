import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import theme from "./utils/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <RouterProvider router={routes} />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
