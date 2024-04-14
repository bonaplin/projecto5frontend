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
      setSocket: (socket) => set({ socket }),
      addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
      setMessages: (newMessages) => set({ messages: newMessages }),
      addNotification: (notification) => set((state) => ({ notifications: [...state.notifications, notification] })),
      //addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      clearMessages: () => set({ messages: [] }),
      clearNotifications: () => set({ notifications: [] }),
      //clearTasks: () => set({ tasks: [] }),
    }),
    {
      name: "socketstore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
