import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {Store} from "./Redux/Store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
);
