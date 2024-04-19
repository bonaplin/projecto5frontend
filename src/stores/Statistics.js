import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const statisticsStore = create(
  persist(
    (set, get) => ({
      statistics: [],
      setStatistics: (statistics) => set({ statistics }),
      updateStatistic: (key, value) => set((state) => ({ statistics: { ...state.statistics, [key]: value } })),
      clearStatistics: () => set({ statistics: {} }),
    }),
    {
      name: "statisticsstore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
