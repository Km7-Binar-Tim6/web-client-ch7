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
    const isAuthPage =
      location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/" ||
      location.pathname === "/cars";

    // Check if the current route starts with '/admin'
    const isAdminPage = location.pathname.startsWith("/admin");

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
      <div className={`layout ${sidebarOpen ? "sidebar-open" : ""}`}>
        {/* Show Sidebar and NavigationBar only on /admin and its subroutes */}
        {isAdminPage && <Sidebar sidebarOpen={sidebarOpen} />}
        <div className="content-wrapper">
          {isAdminPage && <NavigationBar setSidebarOpen={setSidebarOpen} />}
          <main className="content px-3 py-2">
            <Container fluid>
              {/* Protect all routes except login/register */}
              {isAuthPage ? (
                <Outlet />
              ) : (
                <ProtectedRoute>
                  <Outlet />
                </ProtectedRoute>
              )}
            </Container>
          </main>
        </div>
        <TanStackRouterDevtools />
        <ToastContainer theme="colored" />
      </div>
    );
  },
});
