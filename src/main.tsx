import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // wrap App
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { setAuthSuccess } from "./features/auth/authSlice";

// Hydrate auth state from localStorage before rendering
const token = localStorage.getItem("expensepro_token");
const user = localStorage.getItem("expensepro_user");

if (token && user) {
  store.dispatch(setAuthSuccess({ token, user: JSON.parse(user) }));
}

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
