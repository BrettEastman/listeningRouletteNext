// best practice is to make an individual store for each piece of state you want to manage. It is good to be modular and separate concerns. But, you want a store to group related state and actions together. So, all of the count related state and actions are grouped together in the CounterStore, for example.

import { create } from "zustand";
import { GroupStore } from "@/types";

const exampleGroups = ["GPHSB Group", "funemployment Group", "Quarantinos"];

// In Zustand, when you create a store, it is actually a custom hook that you can use to access the store's state and actions, hence needing to have the `use` prefix.
export const useGroupStore = create<GroupStore>((set) => ({
  groupName: "",
  setGroupName: (groupName) => set({ groupName }),

  userData: {
    userId: undefined,
    user: undefined,
    email: undefined,
    bio: "",
    photoURL: "",
    currentGroup: "",
    listeningGroups: exampleGroups,
  },

  setUserData: (userData) =>
    set((state) => ({
      userData: {
        ...state.userData,
        ...userData,
      },
    })),

  handleGroup: (groupName) =>
    set((state) => ({
      groupName,
      userData: {
        ...state.userData,
        currentGroup: groupName,
        listeningGroups: state.userData.listeningGroups.includes(groupName)
          ? state.userData.listeningGroups
          : [...state.userData.listeningGroups, groupName],
      },
    })),
}));
