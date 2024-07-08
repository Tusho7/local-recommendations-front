import { useContext } from "react";
import { AdminContextType } from "../types/admin";
import { AdminContext } from "./AdminContext";

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within a AdminProvider");
  }
  return context;
};
