import React from "react";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./utils/store";
import { checkToken } from "./features/user/userSlice";

import "./styles/main.scss";
import App from "./App";

store.dispatch(checkToken());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
