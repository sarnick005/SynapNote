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
} from "@/components/ui/sheet";
import { useAuthStore } from "@/store/useAuthStore";
import { useNewNotesModalStore } from "@/store/useModalStore";
import { useNotesStore } from "@/store/useNotesStore";
import ChatPanel from "@/components/ChatPanel";
import { useRouter } from "next/navigation";

// icons
import { FiLink } from "react-icons/fi";
import { LuClock4 } from "react-icons/lu";
import { MdOutlineSummarize } from "react-icons/md";

export default function ProfilePage() {
  const { user, isLoggedIn, loading, logout } = useAuthStore();
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

  const router = useRouter();

  useEffect(() => {
    if (user?.id) getNotes();
  }, [user?.id, getNotes]);

  if (loading) {
    return (
      <div className="space-y-2 p-6">
        <Skeleton className="h-6 w-[120px]" />
        <Skeleton className="h-6 w-[200px]" />
      </div>
    );
  }

  if (!isLoggedIn || !user) return <h1 className="p-6">Not authorized</h1>;

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

  const handleLogout = () => {
    logout();
    router.push("/signin");
  };

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen text-gray-900">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-xl  font-bold">Hey, {user.name}!</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={open}>
            + New Note
          </Button>
          <Button onClick={() => setIsChatOpen(true)}>Chat</Button>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
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
              ? "grid-cols-1"
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
                className="rounded-xl border bg-white transition flex flex-col"
              >
                <CardHeader>
                  <CardTitle className="truncate text-lg font-semibold text-gray-800">
                    {note.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow space-y-2">
                  <p className="text-sm text-gray-700 flex-grow">
                    {isExpanded ? content : preview}
                  </p>

                  {content.length > 150 && (
                    <Button
                      variant="link"
                      className="p-0 h-auto text-gray-500 text-xs"
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
                      className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm"
                    >
                      <FiLink className="w-4 h-4" /> Link
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
                        <div className="mt-2 p-2 border rounded-md bg-gray-100 text-sm text-gray-700">
                          {note.aiSummary}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>

                <div className="flex gap-2 p-2 border-t">
                  <Button
                    onClick={() => handleAISummary(note.id)}
                    disabled={loadingSummaryId === note.id}
                    className="flex-1 bg-gray-800 text-white "
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

      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Chat Assistant</SheetTitle>
          </SheetHeader>
          <div className="p-4 h-full">
            <ChatPanel />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
