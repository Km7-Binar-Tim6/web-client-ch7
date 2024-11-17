import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!token) {
      if (
        location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/" &&
        location.pathname !== "/cars"
      ) {
        navigate({ to: "/" });
      }
    } else if (allowedRoles && !allowedRoles.includes(user?.role_id)) {
      // Redirect to home or a 403 page if user role is not allowed
      navigate({ to: "/" });
    }
  }, [token, user?.role_id, allowedRoles, navigate, location.pathname]);

  // Prevent rendering if redirecting
  if (!token) {
    if (
      location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      location.pathname !== "/" &&
      location.pathname !== "/cars"
    ) {
      return null; // Render nothing during redirect
    }
  }

  return children; // Render children only if all checks pass
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.number),
};

export default ProtectedRoute;
