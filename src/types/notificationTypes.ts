import { createContext } from "react";

export interface Notification {
  message: string;
  name: string;
  review: string;
  categoryId: number;
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  clearNotification: () => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
