import { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import Login from "../pages/Login";

const Auth = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  return (
    <div>
      {showForgotPassword ? (
        <ForgotPassword onSuccess={() => setShowForgotPassword(false)} />
      ) : (
        <Login onForgotPassword={() => setShowForgotPassword(true)} />
      )}
    </div>
  );
};

export default Auth;
