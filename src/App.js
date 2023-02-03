import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import theme from "./utils/theme";
import { ModalsContextProvider } from "./modals/ModalsContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ModalsContextProvider>
        <CssBaseline>
          <RouterProvider router={routes} />
        </CssBaseline>
      </ModalsContextProvider>
    </ThemeProvider>
  );
}

export default App;
