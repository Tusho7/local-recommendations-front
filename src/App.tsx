import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Registration from "./pages/Registration";
import Auth from "./components/Auth";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Recommendations from "./pages/Recommendations";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Registration />} />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Home />
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
      </Routes>
    </div>
  );
}

export default App;
