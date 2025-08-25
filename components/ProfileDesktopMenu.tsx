"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ProfileDesktopMenuProps {
  user: { name: string };
  openNewNote: () => void;
  onChatOpen: () => void;
  onLogout: () => void;
}

export default function ProfileDesktopMenu({
  user,
  openNewNote,
  onChatOpen,
  onLogout,
}: ProfileDesktopMenuProps) {
  return (
    <div className="hidden md:flex flex-col items-end space-y-3">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
        Hey, {user.name}!
      </h2>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <Button
          className="bg-gray-900 text-white hover:bg-gray-800 text-sm px-3 py-2"
          onClick={openNewNote}
        >
          + New Note
        </Button>
        <Button
          variant="outline"
          className="text-sm px-3 py-2"
          onClick={onChatOpen}
        >
          Chat
        </Button>
        <Button
          variant="outline"
          className="text-sm px-3 py-2 text-red-600 border-red-200 hover:bg-red-50"
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
