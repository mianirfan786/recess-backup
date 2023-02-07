import React from "react";
import ReactDOM from "react-dom/client";
import "../src/styles/main.scss";
import "rc-slider/assets/index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
