"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatPanel() {
  const [messages, setMessages] = useState<
    { id: string; text: string; from: "user" | "ai" }[]
  >([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: input,
      from: "user" as const,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // TODO: Call AI backend here and append response
    // Example:
    // const aiResponse = await fetch("/api/chat", { method: "POST", body: input });
    // setMessages(prev => [...prev, { id: Date.now(), text: aiResponse, from: "ai" }])
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b font-semibold text-lg">Chat</div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 && (
          <p className="text-muted-foreground">No messages yet.</p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-md max-w-[80%] ${
              msg.from === "user"
                ? "bg-blue-100 self-end"
                : "bg-gray-100 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
