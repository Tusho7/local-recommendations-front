import { useState, useEffect, ReactNode } from "react";
import { NotificationContext, Notification } from "../types/notificationTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
  }, []);

  const addNotification = (notification: Notification) => {
    const updatedNotifications = [...notifications, notification];
    setNotifications(updatedNotifications);

    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));

    toast.success(`დაემატა ახალი რეკომენდაცია: ${notification.name}`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
