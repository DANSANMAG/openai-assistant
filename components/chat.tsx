"use client";

import { useAssistant, Message } from "ai/react";
import { useRef, useEffect, useState } from "react";
import ChatMessage from "./chat-message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Draggable from "react-draggable";

export default function Chat() {
  const [loading, setLoading] = useState(false);
  const [chatHeight, setChatHeight] = useState(500); // Default height
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
    <Draggable>
      <div
        className="fixed bottom-5 right-5 bg-white shadow-lg border rounded-2xl flex flex-col w-[400px]"
        style={{ height: `${chatHeight}px` }}
      >
        {/* Header */}
        <div className="p-3 bg-gray-200 text-center text-black font-semibold cursor-move rounded-t-2xl">
          Chat SanMag
        </div>

        {/* Messages */}
        <div className="flex flex-col flex-grow overflow-y-auto p-3 whitespace-pre-wrap space-y-2">
          {messages.map((msg, index) => (
            <ChatMessage key={index} role={msg.role} content={msg.content} />
          ))}
          {loading && (
            <div className="w-full rounded-3xl animate-pulse bg-gray-300 h-10" />
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box - FIXED Bottom */}
        <div className="p-3 border-t flex items-center gap-2">
          <Input
            ref={inputRef}
            type="text"
            className="flex-grow bg-[#efefef] py-2 px-3 rounded-lg border-2 border-gray-300"
            value={input}
            onChange={handleInputChange}
            placeholder="Scrie mesajul..."
          />
          <Button
            type="submit"
            className="py-2 px-5 bg-black text-white rounded-lg"
            disabled={status !== "awaiting_message"}
            onClick={submitMessage}
          >
            Trimite
          </Button>
        </div>
      </div>
    </Draggable>
  );
}
