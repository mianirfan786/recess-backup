import {CssBaseline} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import {RouterProvider} from "react-router-dom";
import routes from "./routes/routes";
import theme from "./utils/theme";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ModalsContextProvider} from "./modals/ModalsContext";
import {PositionProvider} from "./context/positionContext";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Mr1ZkFMpTOArornza23gXRmC4EkzQfCuEvw6k1ykOhb2lQcUWHZuAFKCrbw6DEWQcolPXrxPpSzJTyyAh18a8EV00TvoCP0ws');

function App() {
    return (
        <ThemeProvider theme={theme}>
            <PositionProvider>
                <ModalsContextProvider>
                    <CssBaseline>
                        <Elements stripe={stripePromise}>
                            <RouterProvider router={routes}/>
                        </Elements>
                    </CssBaseline>
                </ModalsContextProvider>
            </PositionProvider>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </ThemeProvider>
    );
}

export default App;
