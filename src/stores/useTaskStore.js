import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
//100 - todo, 200 - doing, 300 - done
export const useTaskStore = create(
  persist(
    (set, get) => ({
      allTasks: [],

      usernameDD: null,
      categoryDD: null,

      setUsernameDD: (username) => set({ usernameDD: username }),
      setCategoryDD: (category) => set({ categoryDD: category }),
      clearDD: () => set({ usernameDD: "", categoryDD: "" }),

      // setAllTasks: (tasks) => set({ allTasks: tasks }),
      setAllTasks: (tasks) => set({ allTasks: tasks }),
      addTasks: (tasks) =>
        set((state) => {
          const newAllTasks = [...state.allTasks];
          tasks.forEach((task) => {
            if (!newAllTasks.find((t) => t.id === task.id)) {
              newAllTasks.push(task);
            }
          });
          return { allTasks: newAllTasks };
        }),
      addTaskToAll: (task) => set((state) => ({ allTasks: [...state.allTasks, task] })),
      updateTaskToAll: (updatedTask) =>
        set((state) => {
          if (!Array.isArray(state.allTasks)) {
            console.error("updateTaskToAll: state.allTasks is not an array");
            return state;
          }
          return {
            allTasks: state.allTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
          };
        }),

      restoreAllTasks: () =>
        set((state) => ({
          allTasks: state.allTasks.map((task) => ({ ...task, active: true })),
        })),
      restoreTaskToAll: (taskId) =>
        set((state) => {
          if (!Array.isArray(state.allTasks)) {
            console.error("restoreTaskToAll: state.allTasks is not an array");
            return state;
          }
          return {
            allTasks: state.allTasks.map((task) => (task.id === taskId ? { ...task, active: true } : task)),
          };
        }),
      deleteAllTasks: () =>
        set((state) => ({
          allTasks: state.allTasks.filter((task) => task.active),
        })),
      deleteTaskToAll: (taskId) =>
        set((state) => {
          if (!Array.isArray(state.allTasks)) {
            console.error("deleteTaskToAll: state.allTasks is not an array");
            return state;
          }
          return {
            allTasks: state.allTasks.filter((task) => task.id !== taskId),
          };
        }),
      sortTasks: () =>
        set((state) => {
          const sortedTasks = [...state.allTasks];
          sortedTasks.sort((a, b) => {
            // Sort by priority
            if (a.priority !== b.priority) {
              return b.priority - a.priority;
            }
            if (a.startDate !== b.startDate) {
              return new Date(a.startDate) - new Date(b.startDate);
            }
            return new Date(a.endDate) - new Date(b.endDate);
          });
          return { allTasks: sortedTasks };
        }),
    }),
    {
      name: "taskstore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
