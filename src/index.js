import React from "react";
import ReactDOM from "react-dom/client";
import "../src/styles/main.scss";
import "rc-slider/assets/index.css";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

serviceWorkerRegistration.register();
