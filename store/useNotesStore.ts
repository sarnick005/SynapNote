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
  deletingNoteId: string | null;
  loadingSummaryId: string | null;

  getNotes: () => Promise<void>;
  addNote: (note: Note) => void;
  updateNote: (
    id: string,
    data: { title: string; content: string; link?: string | null }
  ) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  clearNotes: () => void;

  setDeletingNoteId: (id: string | null) => void;
  setLoadingSummaryId: (id: string | null) => void;
};

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  loading: false,
  deletingNoteId: null,
  loadingSummaryId: null,

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

  updateNote: async (id, data) => {
    try {
      const res = await axios.put(`/api/notes/${id}`, data);

      if (res.status === 200) {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, ...data } : note
          ),
        }));
      }
    } catch (err) {
      console.error("Failed to update note:", err);
      throw err; 
    }
  },

  deleteNote: async (id: string) => {
    try {
      await axios.delete(`/api/notes/${id}`);
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== id),
      }));
    } catch (err) {
      console.error("Failed to delete note:", err);
      throw err; 
    }
  },

  clearNotes: () => set({ notes: [] }),

  setDeletingNoteId: (id) => set({ deletingNoteId: id }),
  setLoadingSummaryId: (id) => set({ loadingSummaryId: id }),
}));
