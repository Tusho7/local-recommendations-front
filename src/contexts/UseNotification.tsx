import { useContext } from "react";
import {
  NotificationContextType,
  NotificationContext,
} from "../types/notificationTypes";

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
