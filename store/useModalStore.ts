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

type Note = {
  id: string;
  title: string;
  content: string;
  link?: string | null;
};
type EditNotesModalState = {
  isOpen: boolean;
  note: Note | null;
  open: (note: Note) => void;
  close: () => void;
};

export const useEditNoteModalStore = create<EditNotesModalState>((set) => ({
  isOpen: false,
  note: null,
  open: (note) => set({ isOpen: true, note }),
  close: () => set({ isOpen: false, note: null }),
}));
