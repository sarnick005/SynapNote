"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useNotesStore } from "@/store/useNotesStore";
import { SendHorizonal, Bot, User } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

type Message = {
  id: string;
  text: string;
  from: "user" | "ai";
};

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true); 
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { notes } = useNotesStore();
  const { user } = useAuthStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchChats = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/chat?userId=${user.id}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          const loadedMsgs: Message[] = data.flatMap((chat: any) => [
            { id: chat.id + "-u", text: chat.prompt, from: "user" },
            { id: chat.id + "-a", text: chat.response, from: "ai" },
          ]);
          setMessages(loadedMsgs);
        }
      } catch (err) {
        console.error("Failed to load chats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [user?.id]);

  const handleSend = async () => {
    if (!input.trim() || !user?.id) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      from: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    const prompt = input;
    setInput("");

    try {
      const context = notes.map((n) => `${n.title}: ${n.content}`).join("\n");

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context, prompt, userId: user.id }),
      });

      const data = await res.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.text || "Sorry, no response.",
        from: "ai",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("AI response error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: "⚠️ Failed to get AI response.",
          from: "ai",
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full border rounded-xl shadow-sm bg-white">
      <div className="p-4 border-b font-semibold text-lg text-gray-700 flex items-center gap-2">
        <Bot size={20} className="text-gray-500" />
        Chat
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-1/2 rounded-lg" />
            </div>
            <div className="flex items-start gap-2 justify-end">
              <Skeleton className="h-6 w-2/3 rounded-lg" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div className="flex items-start gap-2">
              <Skeleton className="h-6 w-2/5 rounded-lg" />
            </div>
          </div>
        ) : messages.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${
                msg.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.from === "ai" && (
                <Bot size={18} className="text-gray-400 mt-1" />
              )}
              <div
                className={`px-3 py-2 rounded-2xl max-w-[75%] text-sm shadow-sm overflow-auto max-h-52 break-words ${
                  msg.from === "user"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
                style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
              >
                {msg.text}
              </div>
              {msg.from === "user" && (
                <User size={18} className="text-gray-400 mt-1" />
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t flex flex-col gap-2">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            maxLength={250}
            className="flex-1 border-gray-300 focus:ring-gray-500"
          />
          <Button
            onClick={handleSend}
            className="bg-gray-900 text-white hover:bg-gray-700 rounded-xl px-4"
          >
            <SendHorizonal size={18} />
          </Button>
        </div>
        <p className="text-xs text-gray-400 text-right">{input.length}/250</p>
      </div>
    </div>
  );
}
