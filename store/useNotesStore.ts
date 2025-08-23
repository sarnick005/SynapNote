import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";

export type Note = {
  id: string;
  title: string;
  content: string;
  link?: string | null;
  aiSummary?: string; 
  createdAt: string;
};

type NotesState = {
  notes: Note[];
  loading: boolean;
  getNotes: () => Promise<void>;
  addNote: (note: Note) => void;
  clearNotes: () => void;
};

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  loading: false,

  getNotes: async () => {
    const { user } = useAuthStore.getState();
    if (!user?.id) return;

    set({ loading: true });
    try {
      const res = await axios.get<Note[]>(`/api/profile/notes/${user.id}`);
      set({ notes: res.data });
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    } finally {
      set({ loading: false });
    }
  },

  addNote: (note: Note) => {
    set((state) => ({ notes: [note, ...state.notes] }));
  },

  clearNotes: () => set({ notes: [] }),
}));
