import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const statisticsStore = create(
  persist(
    (set, get) => ({
      countUsers: 0,
      confirmedUsers: 0,
      unconfirmedUsers: 0,
      avgTasksPerUser: 0,
      todoPerUser: 0,
      doingPerUser: 0,
      donePerUser: 0,

      setTodoPerUser: (todoPerUser) => set({ todoPerUser }),
      setDoingPerUser: (doingPerUser) => set({ doingPerUser }),
      setDonePerUser: (donePerUser) => set({ donePerUser }),

      setCountUsers: (countUsers) => set({ countUsers }),
      setConfirmedUsers: (confirmedUsers) => set({ confirmedUsers }),
      setUnconfirmedUsers: (unconfirmedUsers) => set({ unconfirmedUsers }),

      setAvgTasksPerUser: (avgTasksPerUser) => set({ avgTasksPerUser }),
      // statistics: [],
      // setStatistics: (statistics) => set({ statistics }),
      // updateStatistic: (key, value) => set((state) => ({ statistics: { ...state.statistics, [key]: value } })),
      // clearStatistics: () => set({ statistics: {} }),
    }),
    {
      name: "statisticsstore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
