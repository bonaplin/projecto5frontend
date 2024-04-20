import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const statisticsStore = create(
  persist(
    (set, get) => ({
      countUsers: 0,
      confirmedUsers: 0,
      unconfirmedUsers: 0,

      setCountUsers: (countUsers) => set({ countUsers }),
      setConfirmedUsers: (confirmedUsers) => set({ confirmedUsers }),
      setUnconfirmedUsers: (unconfirmedUsers) => set({ unconfirmedUsers }),

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
