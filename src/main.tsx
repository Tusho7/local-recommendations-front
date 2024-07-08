import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.tsx";
import { AdminProvider } from "./contexts/AdminContext.tsx";
import error from "./utils/setupConsoleError.ts";

error();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <AdminProvider>
        <Router>
          <App />
        </Router>
      </AdminProvider>
    </UserProvider>
  </React.StrictMode>
);
