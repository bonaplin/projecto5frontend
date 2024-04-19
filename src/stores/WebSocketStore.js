import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const webSocketStore = create(
  persist(
    (set, get) => ({
      socket: null,
      messages: [],
      selectedUser: "",

      setSelectedUser: (selectedUser) => set({ selectedUser }),
      clearSelectedUser: () => set({ selectedUser: "" }),
      setSocket: (socket) => set({ socket }),

      send(message) {
        const { socket } = get();
        if (socket) {
          socket.send(message);
        }
      },

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
