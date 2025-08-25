"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { MessageCircle } from "lucide-react";
import { IoMdAdd } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";

interface ProfileMobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: { name: string };
  openNewNote: () => void;
  onChatOpen: () => void;
  onLogout: () => void;
}

export default function ProfileMobileMenu({
  isOpen,
  setIsOpen,
  user,
  openNewNote,
  onChatOpen,
  onLogout,
}: ProfileMobileMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-80 p-6 flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-xl font-bold">SynapNote</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col flex-1 mt-6 space-y-8">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Hey, {user.name}!
            </h2>
            <p className="text-sm text-gray-500">Welcome back 👋</p>
          </div>

          <div className="flex flex-col space-y-4 justify-center">
            <Button
              className="bg-gray-900 text-white hover:bg-gray-800 justify-start h-12 rounded-xl shadow-sm"
              onClick={() => {
                openNewNote();
                setIsOpen(false);
              }}
            >
              <span className="text-lg mr-3">
                <IoMdAdd />
              </span>
              New Note
            </Button>

            <Button
              variant="outline"
              className="justify-start h-12 rounded-xl shadow-sm border-black"
              onClick={() => {
                onChatOpen();
                setIsOpen(false);
              }}
            >
              <span className="mr-3">
                {" "}
                <MessageCircle className="w-4 h-4 mr-2" />
              </span>
              Chat
            </Button>

            <Button
              variant="outline"
              className="justify-start h-12 border-black rounded-xl shadow-sm"
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
            >
              <span className="mr-3">
                <IoIosLogOut />
              </span>
              Logout
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto text-xs text-gray-400 text-center border-t pt-4">
          SynapNote © {new Date().getFullYear()}
        </div>
      </SheetContent>
    </Sheet>
  );
}
