import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const categoriesStore = create(
  persist(
    (set) => ({
      categories: [],

      setCategories: (categories) => set({ categories }),
      getCategories: () => {
        return categoriesStore.getState().categories;
      },
    }),
    {
      name: "categoriesstore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
