import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
//100 - todo, 200 - doing, 300 - done
export const taskStore = create(
  persist(
    (set) => ({
      todo: [],
      doing: [],
      done: [],
      addTask: (task, status) => {
        set((state) => {
          if (status === 100) {
            return { todo: [task, ...state.todo] };
          } else if (status === 200) {
            return { doing: [task, ...state.doing] };
          } else if (status === 300) {
            return { done: [task, ...state.done] };
          }
        });
      },
      removeTask: (taskId, status) => {
        set((state) => {
          if (status === 100) {
            return { todo: state.todo.filter((task) => task.id !== taskId) };
          } else if (status === 200) {
            return { doing: state.doing.filter((task) => task.id !== taskId) };
          } else if (status === 300) {
            return { done: state.done.filter((task) => task.id !== taskId) };
          }
        });
      },
      updateTask: (updatedTask, status) => {
        set((state) => {
          if (status === 100) {
            return { todo: state.todo.map((task) => (task.id === updatedTask.id ? updatedTask : task)) };
          } else if (status === 200) {
            return { doing: state.doing.map((task) => (task.id === updatedTask.id ? updatedTask : task)) };
          } else if (status === 300) {
            return { done: state.done.map((task) => (task.id === updatedTask.id ? updatedTask : task)) };
          }
        });
      },
      clearTasks: () => set({ todo: [], doing: [], done: [] }),
      setTodo: (tasks) => set({ todo: tasks }),
      setDoing: (tasks) => set({ doing: tasks }),
      setDone: (tasks) => set({ done: tasks }),
    }),
    {
      name: "taskstore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
