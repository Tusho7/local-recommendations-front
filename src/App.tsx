import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Registration from "./pages/Registration";
import Auth from "./components/Auth";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Recommendations from "./pages/Recommendations";
import Profile from "./pages/Profile";
import NotFoundPage from "./pages/NotFoundPage";
import WebSocketProvider from "./utils/WebSocketProvider";
import { NotificationProvider } from "./contexts/NotificationContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewRecommendations from "./pages/NewRecommendations";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PrivateAdminRoute from "./components/PrivateAdminRoutes";
function App() {
  return (
    <NotificationProvider>
      <WebSocketProvider />
      <div>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Registration />} />

          <Route path="/admin_login" element={<AdminLogin />} />
          <Route
            path="/admin_dashboard"
            element={
              <PrivateAdminRoute>
                <AdminDashboard />
              </PrivateAdminRoute>
            }
          />

          <Route
            path="*"
            element={
              <PrivateRoute>
                <NotFoundPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/about_us"
            element={
              <PrivateRoute>
                <AboutUs />
              </PrivateRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <Contact />
              </PrivateRoute>
            }
          />
          <Route
            path="/category/:id"
            element={
              <PrivateRoute>
                <Recommendations />
              </PrivateRoute>
            }
          />
          <Route
            path="/new_recommendations"
            element={
              <PrivateRoute>
                <NewRecommendations />
              </PrivateRoute>
            }
          />
        </Routes>
        <ToastContainer />
      </div>
    </NotificationProvider>
  );
}

export default App;
