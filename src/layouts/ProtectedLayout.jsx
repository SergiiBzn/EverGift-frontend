/** @format */

import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth.jsx";

const ProtectedLayout = () => {
  const { user, isRefreshing } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // prevent any navigation until the user is authenticated
    if (isRefreshing) return;

    // If the user is null (i.e., the user is not authenticated), the user is redirected to the login page
    if (!user) navigate("/login");
  }, [user, isRefreshing, navigate]);

  /*  (This prevents a page to be display for a small amount of time before the page to be displayed is ready */
  if (!user) return null;
  // Render the protected content if the user is authenticated
  return <Outlet />;
};

export default ProtectedLayout;
