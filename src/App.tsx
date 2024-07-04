import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Registration from "./pages/Registration";
import Auth from "./components/Auth";
import Home from "./pages/Home";

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
      </Routes>
    </div>
  );
}

export default App;
