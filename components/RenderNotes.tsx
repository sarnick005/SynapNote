"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiLink } from "react-icons/fi";
import { LuClock4 } from "react-icons/lu";
import { MdOutlineSummarize } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { useNotesStore } from "@/store/useNotesStore";
import { useEditNoteModalStore } from "@/store/useModalStore";
import { toast } from "react-toastify";

type Note = {
  id: string;
  title: string;
  content: string;
  link?: string | null;
  createdAt: string;
  aiSummary?: string | null;
};

type RenderNotesProps = {
  notes: Note[];
  expandedNotes: Record<string, boolean>;
  visibleSummaries: Record<string, boolean>;
  toggleExpand: (id: string) => void;
  toggleSummary: (id: string) => void;
  handleAISummary: (id: string) => void;
  loadingSummaryId: string | null;
};

export default function RenderNotes({
  notes,
  expandedNotes,
  visibleSummaries,
  toggleExpand,
  toggleSummary,
  handleAISummary,
  loadingSummaryId,
}: RenderNotesProps) {
  const { deleteNote, deletingNoteId, setDeletingNoteId } = useNotesStore();
  const { open: openEditModal } = useEditNoteModalStore();

  async function handleDeleteNote(id: string) {
    try {
      setDeletingNoteId(id);
      await deleteNote(id);
      toast.success("Note deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete note");
    } finally {
      setDeletingNoteId(null);
    }
  }

  function handleEditNote(note: Note) {
    openEditModal(note);
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start">
      {notes.map((note) => {
        const isExpanded = expandedNotes[note.id];
        const showSummary = visibleSummaries[note.id];
        const content = note.content || "";
        const preview =
          content.length > 150 ? content.slice(0, 150) + "..." : content;

        return (
          <Card
            key={note.id}
            className="rounded-xl border bg-white transition flex flex-col hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-2">
                {note.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col flex-grow space-y-2 -mt-4">
              <p className="text-sm text-gray-700 flex-grow whitespace-pre-wrap">
                {isExpanded ? content : preview}
              </p>

              {content.length > 150 && (
                <Button
                  variant="link"
                  className="p-0 h-auto text-gray-500 text-xs self-start"
                  onClick={() => toggleExpand(note.id)}
                >
                  {isExpanded ? "View Less" : "View More"}
                </Button>
              )}

              {note.link && (
                <a
                  href={note.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 underline text-sm transition-colors"
                >
                  <FiLink className="w-4 h-4" /> View Link
                </a>
              )}

              <p className="flex items-center gap-1 text-xs text-gray-400">
                <LuClock4 className="w-3 h-3" />
                {new Date(note.createdAt).toLocaleString()}
              </p>

              {note.aiSummary && (
                <div className="mt-2">
                  <Button
                    variant="link"
                    className="p-0 h-auto text-gray-500 text-xs flex items-center gap-1"
                    onClick={() => toggleSummary(note.id)}
                  >
                    <MdOutlineSummarize className="w-4 h-4" />
                    {showSummary ? "Hide Summary" : "View Summary"}
                  </Button>
                  {showSummary && (
                    <div className="mt-2 p-3 border rounded-md bg-blue-50 text-sm text-gray-700">
                      <p className="italic">{note.aiSummary}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>

            <div className="flex gap-2 p-3 border-t bg-gray-50">
              <Button
                onClick={() => handleDeleteNote(note.id)}
                disabled={deletingNoteId === note.id}
                variant="outline"
                size="sm"
                className="flex-1 border-black "
              >
                <AiOutlineDelete className="w-4 h-4 mr-1" />
                {deletingNoteId === note.id ? "Deleting..." : "Delete"}
              </Button>

              <Button
                onClick={() => handleEditNote(note)}
                variant="outline"
                size="sm"
                className="flex-1 border-black"
              >
                <FaRegEdit className="w-4 h-4 mr-1" />
                Edit
              </Button>

              <Button
                onClick={() => handleAISummary(note.id)}
                disabled={loadingSummaryId === note.id}
                variant="outline"
                size="sm"
                className="flex-1 border-black"
              >
                <IoBookOutline className="w-4 h-4 mr-1" />
                {loadingSummaryId === note.id ? "Generating..." : "AI Summary"}
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
