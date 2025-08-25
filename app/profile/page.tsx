"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NewNoteModal from "@/components/NewNoteModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { useAuthStore } from "@/store/useAuthStore";
import { useNewNotesModalStore } from "@/store/useModalStore";
import { useNotesStore } from "@/store/useNotesStore";
import ChatPanel from "@/components/ChatPanel";
import { useRouter } from "next/navigation";
import ProfileDesktopMenu from "@/components/ProfileDesktopMenu";
import ProfileMobileMenu from "@/components/ProfileMobileMenu";
import RenderNotes from "@/components/RenderNotes";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (!loading && (!isLoggedIn || !user)) {
      router.replace("/signin");
    }
  }, [loading, isLoggedIn, user, router]);

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
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-black"
        >
          SynapNote
        </motion.h1>

        {/* Desktop view */}
        <ProfileDesktopMenu
          user={user}
          openNewNote={open}
          onChatOpen={() => setIsChatOpen(true)}
          onLogout={handleLogout}
        />
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2"
          >
            <svg
              className="h-10 w-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </div>
      <ProfileMobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        user={user}
        openNewNote={open}
        onChatOpen={() => setIsChatOpen(true)}
        onLogout={handleLogout}
      />

      {/* Notes grid */}
      {notesLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      ) : notes.length === 0 ? (
        <p className="text-muted-foreground">No notes yet. Create one!</p>
      ) : (
        // rendering all notes
        <RenderNotes
          notes={notes}
          expandedNotes={expandedNotes}
          visibleSummaries={visibleSummaries}
          toggleExpand={toggleExpand}
          toggleSummary={toggleSummary}
          handleAISummary={handleAISummary}
          loadingSummaryId={loadingSummaryId}
        />
      )}

      <NewNoteModal />

      {/* Chat Sheet */}
      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <div className="px-4 pb-16 h-full">
            <ChatPanel />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
