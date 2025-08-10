import { useSelector } from "react-redux";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import { useEffect } from "react";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import UserLayout from "./components/layout/UserLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileOverviewPage from "./pages/profile/ProfileOverviewPage";
import EditProfilePage from "./pages/profile/EditProfilePage";
import SettingsPage from "./pages/profile/SettingsPage";
import SecurityPage from "./pages/profile/SecurityPage";

function App() {
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    const root = window.document.documentElement;
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      root.classList.add(systemTheme ? "dark" : "light");
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<AppLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<UserLayout />}>
              {/* The index route is the default page shown at "/profile" */}
              <Route index element={<ProfileOverviewPage />} />
              <Route path="edit" element={<EditProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="security" element={<SecurityPage />} />
            </Route>
            {/* You can add other protected routes like /dashboard here */}
            <Route path="/dashboard" element={<div>Dashboard Page</div>} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
}

export default App;
