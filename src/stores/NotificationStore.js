import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const notificationStore = create(
  persist(
    (set, get) => ({
      notifications: [],

      notificationCounter: 0,
      addNotification: (notification) => {
        set((state) => ({
          notifications: [notification, ...state.notifications],
          unreadNotifications: [notification, ...state.unreadNotifications],
        }));
      },
      setNotifications: (notifications) => set({ notifications }),
      addNotificationCounter: () => set((state) => ({ notificationCounter: state.notificationCounter + 1 })),
      clearNotifications: () => set({ notifications: [], unreadNotifications: [], readNotifications: [] }),
      setNotificationCounter: (counter) => set({ notificationCounter: counter }),
    }),
    {
      name: "notificationstore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
