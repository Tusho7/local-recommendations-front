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
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PrivateAdminRoute from "./components/PrivateAdminRoutes";
import AdminLayout from "./AdminLayout";
import AdminRecommendations from "./pages/admin/AdminRecommendations";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminUsers from "./pages/admin/AdminUsers";
function App() {
  return (
    <NotificationProvider>
      <WebSocketProvider />
      <div>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/register" element={<Registration />} />

          <Route path="/admin_login" element={<AdminLogin />} />

          <Route
            path="/"
            element={
              <PrivateAdminRoute>
                <AdminLayout />
              </PrivateAdminRoute>
            }
          >
            <Route
              path="/admin_dashboard"
              element={
                <PrivateAdminRoute>
                  <AdminDashboard />
                </PrivateAdminRoute>
              }
            />

            <Route
              path="/admin_profile"
              element={
                <PrivateAdminRoute>
                  <AdminProfile />
                </PrivateAdminRoute>
              }
            />

            <Route
              path="/admin_categories"
              element={
                <PrivateAdminRoute>
                  <AdminCategories />
                </PrivateAdminRoute>
              }
            />

            <Route
              path="/admin_recommendations"
              element={
                <PrivateAdminRoute>
                  <AdminRecommendations />
                </PrivateAdminRoute>
              }
            />
            <Route
              path="/admin_users"
              element={
                <PrivateAdminRoute>
                  <AdminUsers />
                </PrivateAdminRoute>
              }
            />
          </Route>

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
