"use client";

import { useState, useEffect } from "react";
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
import { useNotesStore } from "@/store/useNotesStore";
import axios from "axios";
import { toast } from "react-toastify";
import { useEditNoteModalStore } from "@/store/useModalStore";

export default function EditNoteModal() {
  const { isOpen, note, close } = useEditNoteModalStore();
  const { getNotes } = useNotesStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  // Pre-fill fields when note changes
  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
      setLink(note.link || "");
    }
  }, [note]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note) return;

    if (title.length > 150) {
      toast.warning("Title must be at most 150 characters.");
      return;
    }

    if (content.length > 1000) {
      toast.warning("Content must be at most 1000 characters.");
      return;
    }

    try {
      setLoading(true);
      await axios.put(`/api/notes/${note.id}`, {
        title,
        content,
        link,
      });
      await getNotes();
      toast.success("Note updated successfully!");
      close();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
            <DialogDescription>
              Update the fields and save your changes.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter note title (max 150 characters)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={150}
              required
            />
            <p className="text-xs text-gray-500">{title.length}/150</p>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Write your note here... (max 1000 characters)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={1000}
              required
            />
            <p className="text-xs text-gray-500">{content.length}/1000</p>
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
              <Button
                type="button"
                variant="outline"
                onClick={close}
                disabled={loading}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
