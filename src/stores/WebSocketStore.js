// store.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const webSocketStore = create(
  persist(
    (set, get) => ({
      socket: null,
      messages: [],
      notifications: [],
      //tasks: [],
      notificationCounter: 0,
      setSocket: (socket) => set({ socket }),
      addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
      setMessages: (newMessages) => set({ messages: newMessages }),
      addNotification: (notification) => set((state) => ({ notifications: [notification, ...state.notifications] })),
      //addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      clearMessages: () => set({ messages: [] }),
      clearNotifications: () => set({ notifications: [] }),
      //clearTasks: () => set({ tasks: [] }),
      setNotificationCounter: (counter) => set({ notificationCounter: counter }),
      setNotifications: (newNotification) => set({ notifications: newNotification }),
    }),
    {
      name: "socketstore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
