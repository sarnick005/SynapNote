"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, MessageCircle, LogOut, User } from "lucide-react";

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
    <motion.div
      className="hidden md:flex flex-row items-end space-y-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
   
      <motion.div
        className="flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            className="bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg px-4 py-2.5 font-medium"
            onClick={openNewNote}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md px-4 py-2.5 font-medium"
            onClick={onChatOpen}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md px-4 py-2.5 font-medium group"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 mr-2 group-hover:rotate-6 transition-transform duration-200" />
            Logout
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
