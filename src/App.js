import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import theme from "./utils/theme";
import { ModalsContextProvider } from "./modals/ModalsContext";
import { PositionProvider } from "./context/positionContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PositionProvider>
        <ModalsContextProvider>
          <CssBaseline>
            <RouterProvider router={routes} />
          </CssBaseline>
        </ModalsContextProvider>
      </PositionProvider>
    </ThemeProvider>
  );
}

export default App;
