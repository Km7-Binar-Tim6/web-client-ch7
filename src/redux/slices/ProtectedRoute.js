import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation(); // Get current path

  useEffect(() => {
    // If user is not logged in and is not on login/register page, redirect to login
    if (
      !token &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      navigate({ to: "/login" });
    } else if (allowedRoles && !allowedRoles.includes(user?.role_id)) {
      // If role is not allowed, redirect to homepage or a 403 page
      navigate({ to: "/" });
    }
  }, [token, navigate, user?.role_id, allowedRoles, location.pathname]);

  if (
    !token &&
    location.pathname !== "/login" &&
    location.pathname !== "/register"
  ) {
    return null; // Render nothing while redirecting
  }

  return children; // Render protected content if user has the right role
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Renderable content
  allowedRoles: PropTypes.arrayOf(PropTypes.number), // Allowed roles array (e.g., [1] for admin)
};

export default ProtectedRoute;
