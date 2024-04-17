import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const webSocketStore = create(
  persist(
    (set, get) => ({
      socket: null,
      messages: [],

      setSocket: (socket) => set({ socket }),
      addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
      setMessages: (newMessages) => set({ messages: newMessages }),

      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: "socketstore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
