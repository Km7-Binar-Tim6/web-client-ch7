import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import Sidebar from "../components/Navbar/Sidebar";
import NavigationBar from "../components/Navbar";
import ProtectedRoute from "../redux/slices/ProtectedRoute";
import { useState } from "react";

// Root component
export const Route = createRootRoute({
  component: () => {
    const location = useLocation();
    const isLoginPage =
      location.pathname === "/login" || location.pathname === "/register";
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
      <div className={`layout ${sidebarOpen ? "sidebar-open" : ""}`}>
        {!isLoginPage && <Sidebar sidebarOpen={sidebarOpen} />}
        <div className="content-wrapper">
          {!isLoginPage && <NavigationBar setSidebarOpen={setSidebarOpen} />}
          <main className="content px-3 py-2">
            <Container fluid>
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            </Container>
          </main>
        </div>
        <TanStackRouterDevtools />
        <ToastContainer theme="colored" />
      </div>
    );
  },
});
