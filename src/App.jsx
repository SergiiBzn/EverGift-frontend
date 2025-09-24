/** @format */

import { Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
import ProtectedLayout from "./layouts/ProtectedLayout.jsx";
import Contacts from "./pages/Contacts.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications.jsx";
import Profile from "./pages/Profile.jsx";
import Register from "./pages/Register.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";

const App = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<div>Dashboard</div>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>
          {/* Not found Page */}
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
