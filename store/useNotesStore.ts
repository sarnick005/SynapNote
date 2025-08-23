// store/useNotesStore.ts
import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";

export type Note = {
  aiSummary: any;
  id: string;
  title: string;
  content: string;
  link?: string | null;
  createdAt: string;
};

type NotesState = {
  notes: Note[];
  loading: boolean;
  getNotes: () => Promise<void>;
  addNote: (note: Note) => void;
};

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  loading: false,

  getNotes: async () => {
    const { user } = useAuthStore.getState();
    if (!user?.id) return;

    set({ loading: true });
    try {
      const res = await axios.get(`/api/profile/notes/${user.id}`);
      set({ notes: res.data, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
}));
