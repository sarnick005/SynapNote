"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNewNotesModalStore } from "@/store/useModalStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useNotesStore } from "@/store/useNotesStore";
import axios from "axios";

export default function NewNoteModal() {
  const { isOpen, close } = useNewNotesModalStore();
  const { user } = useAuthStore();
  const { addNote } = useNotesStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return alert("User not found!");

    if (title.length > 100)
      return alert("Title must be at most 100 characters.");
    if (content.length > 500)
      return alert("Content must be at most 500 characters.");

    try {
      const res = await axios.post("/api/notes", {
        title,
        content,
        link,
        userId: user.id,
      });
      addNote(res.data);

      close();
      setTitle("");
      setContent("");
      setLink("");
      window.location.reload();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add note");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add a New Note</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new note.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter note title (max 100 characters)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              required
            />
            <p className="text-xs text-gray-500">{title.length}/100</p>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Write your note here... (max 500 characters)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={500}
              required
            />
            <p className="text-xs text-gray-500">{content.length}/500</p>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="link">Link</Label>
            <Input
              id="link"
              name="link"
              placeholder="Enter link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={close}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save Note</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
