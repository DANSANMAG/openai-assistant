Skip to content
Sanmag's projects
Sanmag's projects

Hobby

openai-assistant

cn2taeic1

Changelog
Help
Docs

Source
Output
components/chat.tsx

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
    useAssistant({
      api: "/api/assistant",
    });

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
    <div className="flex flex-col-reverse h-full w-full">
      <div className="flex flex-col order-2 flex-grow overflow-y-auto p-3 pt-5 whitespace-pre-wrap space-y-4">
        {
          <ChatMessage
            key="key"
            role="assistant"
            content="Bun venit! Întreabă-mă orice despre produsele Sanmag!"
          />
        }
        {messages.map((msg, index) => (
          <ChatMessage key={index} role={msg.role} content={msg.content} />
        ))}
        {loading && (
          <div className="w-full rounded-3xl animate-pulse bg-gray-300 h-10" />
openai-assistant – Deployment Source – Vercel
