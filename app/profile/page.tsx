"use client";

import { useState, useEffect } from "react";
import NewNoteModal from "@/components/NewNoteModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuthStore } from "@/store/useAuthStore";
import { useNewNotesModalStore } from "@/store/useModalStore";
import { useNotesStore } from "@/store/useNotesStore";
import ChatPanel from "@/components/ChatPanel";

export default function ProfilePage() {
  const { user, isLoggedIn, loading } = useAuthStore();
  const { open } = useNewNotesModalStore();
  const { notes, loading: notesLoading, getNotes } = useNotesStore();

  const [loadingSummaryId, setLoadingSummaryId] = useState<string | null>(null);
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>(
    {}
  );
  const [visibleSummaries, setVisibleSummaries] = useState<
    Record<string, boolean>
  >({});
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (user?.id) getNotes();
  }, [user?.id, getNotes]);

  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-6 w-[120px]" />
        <Skeleton className="h-6 w-[200px]" />
      </div>
    );
  }

  if (!isLoggedIn || !user) return <h1>Not authorized</h1>;

  const handleAISummary = async (id: string) => {
    try {
      setLoadingSummaryId(id);
      const res = await fetch(`/api/notes/${id}/summary`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to generate summary");
      await getNotes();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSummaryId(null);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedNotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSummary = (id: string) => {
    setVisibleSummaries((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Hey {user.name}</h1>
        <div className="flex gap-2">
          <Button onClick={open}>Add new note</Button>
          <Button onClick={() => setIsChatOpen(true)}>Open Chat</Button>
        </div>
      </div>

      {/* Notes Grid */}
      {notesLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      ) : notes.length === 0 ? (
        <p className="text-muted-foreground">No notes yet. Create one!</p>
      ) : (
        <div
          className={`grid gap-4 ${
            isChatOpen
              ? "grid-cols-1" // When chat slider open, force 1 column
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {notes.map((note) => {
            const isExpanded = expandedNotes[note.id];
            const showSummary = visibleSummaries[note.id];
            const content = note.content || "";
            const preview =
              content.length > 150 ? content.slice(0, 150) + "..." : content;

            return (
              <Card
                key={note.id}
                className="hover:shadow-lg transition h-full flex flex-col"
              >
                <CardHeader>
                  <CardTitle>{note.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <p className="text-sm text-muted-foreground flex-grow">
                    {isExpanded ? content : preview}
                  </p>

                  {content.length > 150 && (
                    <Button
                      variant="link"
                      className="p-0 h-auto text-blue-500 text-sm"
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
                      className="text-sm text-blue-500 underline mt-2 inline-block"
                    >
                      Visit Link
                    </a>
                  )}

                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(note.createdAt).toLocaleString()}
                  </p>

                  {/* AI Summary Toggle */}
                  {note.aiSummary && (
                    <div className="mt-3">
                      <Button
                        variant="link"
                        className="p-0 h-auto text-blue-500 text-sm"
                        onClick={() => toggleSummary(note.id)}
                      >
                        {showSummary ? "Hide AI Summary" : "View AI Summary"}
                      </Button>
                      {showSummary && (
                        <div className="mt-2 p-2 border rounded-md bg-gray-50 text-sm">
                          <strong>AI Summary:</strong> {note.aiSummary}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>

                <div className="flex gap-2 p-2">
                  <Button>View</Button>
                  <Button
                    onClick={() => handleAISummary(note.id)}
                    disabled={loadingSummaryId === note.id}
                  >
                    {loadingSummaryId === note.id
                      ? "Generating..."
                      : "AI Summary"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <NewNoteModal />

      {/* Chat Slider */}
      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Chat</SheetTitle>
          </SheetHeader>
          <div className="p-4 h-full">
            <ChatPanel />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
