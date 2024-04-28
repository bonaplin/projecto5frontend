import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
//100 - todo, 200 - doing, 300 - done
export const taskStore = create(
  persist(
    (set) => ({
      todo: [],
      doing: [],
      done: [],
      deleted: [],
      usernameDD: null,
      categoryDD: null,
      deleteAllTask: () => set({ delete: [] }),
      setUsernameDD: (username) => set({ usernameDD: username }),
      setCategoryDD: (category) => set({ categoryDD: category }),
      clearDD: () => set({ usernameDD: "", categoryDD: "" }),
      addTask: (task, status, index) => {
        set((state) => {
          if ((!state.usernameDD || task.owner === state.usernameDD) && (!state.categoryDD || task.category === state.categoryDD)) {
            if (status === 100) {
              let newTodo = [...state.todo];
              newTodo.splice(index, 0, task);
              return { todo: newTodo };
            } else if (status === 200) {
              let newDoing = [...state.doing];
              newDoing.splice(index, 0, task);
              return { doing: newDoing };
            } else if (status === 300) {
              let newDone = [...state.done];
              newDone.splice(index, 0, task);
              return { done: newDone };
            }
          } else {
            console.error("Task does not match current filters:", task);
            return state;
          }
        });
      },
      removeTask: (taskId, status) => {
        set((state) => {
          if (status === 100) {
            return { ...state, todo: state.todo.filter((task) => task.id !== taskId) };
          } else if (status === 200) {
            return { ...state, doing: state.doing.filter((task) => task.id !== taskId) };
          } else if (status === 300) {
            return { ...state, done: state.done.filter((task) => task.id !== taskId) };
          }
        });
      },
      updateTask: (updatedTask, status, index) => {
        set((state) => {
          if (status === 100) {
            let newTodo = [...state.todo];
            newTodo.splice(index, 1, updatedTask);
            return { todo: state.todo.map((task) => (task.id === updatedTask.id ? updatedTask : task)) };
          } else if (status === 200) {
            let newDoing = [...state.doing];
            newDoing.splice(index, 1, updatedTask);
            return { doing: state.doing.map((task) => (task.id === updatedTask.id ? updatedTask : task)) };
          } else if (status === 300) {
            let newDone = [...state.done];
            newDone.splice(index, 1, updatedTask);
            return { done: state.done.map((task) => (task.id === updatedTask.id ? updatedTask : task)) };
          }
        });
      },
      clearTasks: () => set({ todo: [], doing: [], done: [] }),
      setTodo: (tasks) => set({ todo: tasks }),
      setDoing: (tasks) => set({ doing: tasks }),
      setDone: (tasks) => set({ done: tasks }),
      setDeleted: (tasks) => set({ deleted: tasks }),
      addDeletedTask: (task) => set((state) => ({ deleted: [...state.deleted, task] })),
    }),
    {
      name: "taskstore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
