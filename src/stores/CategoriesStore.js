import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const categoriesStore = create(
  persist(
    (set) => ({
      categories: [],
      categoriesNames: [],

      setCategoriesNames: (categoriesNames) => set({ categoriesNames }),
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
