import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

/**
 * AuthRouter acts as a smart gatekeeper for all routes:
 * - If not logged in → redirects away from protected routes
 * - If logged in → redirects away from public routes
 */
const AuthRouter: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const publicPaths = ["/", "/signin", "/signup"];
  const protectedPaths = [
    "/dashboard",
    "/identify",
    "/plant-details",
    "/learn",
    "/health-check",
    "/reminders",
  ];

  useEffect(() => {
    const currentPath = location.pathname;

    // ✅ If user not logged in but trying to access a protected route
    if (!token && protectedPaths.some((path) => currentPath.startsWith(path))) {
      navigate("/", { replace: true });
      return;
    }

    // ✅ If user logged in but trying to access a public route
    if (token && publicPaths.includes(currentPath)) {
      navigate("/dashboard", { replace: true });
      return;
    }
  }, [token, location.pathname, navigate]);

  return <Outlet />;
};

export default AuthRouter;
