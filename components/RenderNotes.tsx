"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiLink } from "react-icons/fi";
import { LuClock4 } from "react-icons/lu";
import { MdOutlineSummarize } from "react-icons/md";

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
            className="rounded-xl border bg-white transition flex flex-col"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                {note.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col flex-grow space-y-2 -mt-4">
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
                <div className="mt-2 ">
                  <Button
                    variant="link"
                    className="p-0 h-auto text-gray-500 text-xs flex items-center gap-1"
                    onClick={() => toggleSummary(note.id)}
                  >
                    <MdOutlineSummarize className="w-4 h-4 -ml-3" />
                    {showSummary ? "Hide Summary" : "View Summary"}
                  </Button>
                  {showSummary && (
                    <div className="mt-2 p-2 border rounded-md bg-gray-50 text-sm text-gray-700">
                      <i> {note.aiSummary}</i>
                    </div>
                  )}
                </div>
              )}
            </CardContent>

            <div className="flex gap-2 p-2 border-t">
              <Button
                onClick={() => handleAISummary(note.id)}
                disabled={loadingSummaryId === note.id}
                className="flex-1 bg-gray-900 text-white "
              >
                {loadingSummaryId === note.id ? "Generating..." : "AI Summary"}
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
