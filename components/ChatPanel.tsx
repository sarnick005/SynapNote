"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNotesStore } from "@/store/useNotesStore";
import { SendHorizonal, Bot, User } from "lucide-react";

type Message = {
  id: string;
  text: string;
  from: "user" | "ai";
};

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { notes } = useNotesStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      from: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const context = notes.map((n) => `${n.title}: ${n.content}`).join("\n");
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context, prompt: input }),
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
      {/* Header */}
      <div className="p-4 border-b font-semibold text-lg text-gray-700 flex items-center gap-2">
        <Bot size={20} className="text-gray-500" />
        Chat
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm text-center">No messages yet.</p>
        )}
        {messages.map((msg) => (
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
              className={`px-3 py-2 rounded-2xl max-w-[75%] text-sm shadow-sm ${
                msg.from === "user"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
            {msg.from === "user" && (
              <User size={18} className="text-gray-400 mt-1" />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
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
