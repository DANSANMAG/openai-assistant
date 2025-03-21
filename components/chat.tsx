"use client";

import { useAssistant, Message } from "ai/react";
import { useRef, useEffect, useState } from "react";
import ChatMessage from "./chat-message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Chat() {
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { status, messages, submitMessage, input, handleInputChange } =
    useAssistant({ api: "/api/assistant" });

  useEffect(() => {
    if (status === "in_progress") {
      setLoading(true);
    }

    if (status === "awaiting_message" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [status]);

  useEffect(() => {
    if ([...messages].pop()?.role === "assistant") {
      setLoading(false);
    }
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="fixed bottom-5 right-5 bg-white shadow-lg border rounded-2xl flex flex-col w-[420px] h-[580px]"
    >
      {/* Header */}
      <div className="p-3 bg-gray-200 text-center text-black font-semibold rounded-t-2xl">
        Chat SanMag
      </div>

      {/* Messages */}
      <div className="flex flex-col flex-grow overflow-y-auto p-3 space-y-2">
        {messages.map((msg, index) => (
          <ChatMessage key={index} role={msg.role} content={msg.content} />
        ))}
        {loading && (
          <div className="w-full rounded-3xl animate-pulse bg-gray-300 h-10" />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box - FIXED Bottom */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitMessage();
        }}
        className="p-3 border-t flex items-center gap-2 bg-white"
      >
        <Input
          ref={inputRef}
          type="text"
          className="flex-grow bg-[#efefef] py-3 px-4 rounded-lg border border-gray-300"
          value={input}
          onChange={handleInputChange}
          placeholder="Scrie mesajul..."
        />
        <Button
          type="submit"
          className="py-2 px-5 bg-black text-white rounded-lg"
          disabled={status !== "awaiting_message"}
        >
          Trimite
        </Button>
      </form>
    </div>
  );
}
