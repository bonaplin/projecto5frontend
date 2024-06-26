//Our store is called userStore and is created using
//function create imported from zustand.
//The store has one state variable called username and a function called updateName
// to receive new value for the state variable and update it.
//In this code, we also use persist to persistently save our store's data.
//Persist is imported from zustand/middleware.
//In this example, we selected sessionStorage as the place to persist the store.

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

//define the store
export const userStore = create(
  persist(
    (set) => ({
      username: "", //state variable
      token: "",
      role: "",
      firstname: "",
      lastname: "",
      photoURL: "",
      email: "",
      phone: "",
      confirmed: "",
      users: [],
      userNames: [],

      locale: "en",
      updateLocale: (locale) => set({ locale }),

      setUsernames: (userNames) => set({ userNames }),
      setUsers: (users) => set({ users }),
      getUsers: () => {
        return userStore.getState().user;
      },
      updateUsername: (username) => set({ username }), //action
      updateToken: (token) => set({ token }), //new action
      updateRole: (role) => set({ role }), //new action
      updateFirstname: (firstname) => set({ firstname }), //new action
      updateLastname: (lastname) => set({ lastname }), //new action
      updatePhotoUrl: (photoURL) => set({ photoURL }), //new action
      updateEmail: (email) => set({ email }), //new action
      updatePhone: (phone) => set({ phone }), //new action
      updateConfirm: (confirmed) => set({ confirmed }), //new action

      updateUser: (data) =>
        set((state) => ({
          ...state,
          photoURL: data.photoURL,
          username: data.username,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          phone: data.phone,
          role: data.role,
        })),

      logout: () =>
        set({
          username: "",
          token: "",
          role: "",
          firstname: "",
          lastname: "",
          photourl: "",
          email: "",
          phone: "",
          confirmed: "",
          user: [],
        }),
    }),
    {
      name: "userstore", //name of the storage
      storage: createJSONStorage(() => sessionStorage), //storage type
    }
  )
);
