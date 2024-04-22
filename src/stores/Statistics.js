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
      avgTimeToBeDone: 0,
      chartUserPerTime: [],
      chartTaskComulative: [],
      chartTaskChange: 0,
      chartUserChange: 0,

      setChartTaskComulative: (chartTaskComulative) => set({ chartTaskComulative }),
      setAvgTimeToBeDone: (avgTimeToBeDone) => set({ avgTimeToBeDone }),
      setChartUserPerTime: (chartUserPerTime) => set({ chartUserPerTime }),
      setTodoPerUser: (todoPerUser) => set({ todoPerUser }),
      setDoingPerUser: (doingPerUser) => set({ doingPerUser }),
      setDonePerUser: (donePerUser) => set({ donePerUser }),
      setCountUsers: (countUsers) => set({ countUsers }),
      setConfirmedUsers: (confirmedUsers) => set({ confirmedUsers }),
      setUnconfirmedUsers: (unconfirmedUsers) => set({ unconfirmedUsers }),

      addChartTaskChange: () => set((state) => ({ chartTaskChange: state.chartTaskChange + 1 })),
      setAvgTasksPerUser: (avgTasksPerUser) => set({ avgTasksPerUser }),

      // setChartTaskComulative: (newData) =>
      //   set((state) => ({
      //     ...state,
      //     chartTaskComulative: Array.isArray(newData) ? [...newData] : [],
      //   })),

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
