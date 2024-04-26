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
        }));
      },
      setNotifications: (notifications) => set({ notifications }),
      addNotificationCounter: () => set((state) => ({ notificationCounter: state.notificationCounter + 1 })),
      clearNotifications: () => set({ notifications: [] }),
      setNotificationCounter: (counter) => set({ notificationCounter: counter }),
    }),
    {
      name: "notificationstore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
