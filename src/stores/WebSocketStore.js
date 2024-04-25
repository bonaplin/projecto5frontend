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
      readMessages: (incomingMessage) =>
        set((state) => ({
          messages: state.messages.map((existingMessage) =>
            existingMessage.id === incomingMessage.id && existingMessage.receiver === state.selectedUser
              ? { ...existingMessage, read: true }
              : existingMessage
          ),
        })),
      clearMessages: () => set({ messages: [] }),

      // Create a new array to update the read status, instead change directly the state.
      markAsRead: () =>
        set((state) => {
          const updatedMessages = state.messages.map((message) => {
            return { ...message, read: true };
          });
          return { ...state, messages: updatedMessages };
        }),
    }),
    {
      name: "socketstore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
