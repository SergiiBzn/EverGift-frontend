/** @format */

import { Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
import ProtectedLayout from "./layouts/ProtectedLayout.jsx";

import {
  Contacts,
  Dashboard,
  Login,
  NotFound,
  Notifications,
  Profile,
  Register,
} from "./pages";

import { AuthContextProvider } from "./contexts/AuthContext.jsx";

const App = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedLayout />}>
            <Route index element={<Dashboard />} />
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
