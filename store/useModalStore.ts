import { create } from "zustand";

type NewNotesModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useNewNotesModalStore = create<NewNotesModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
