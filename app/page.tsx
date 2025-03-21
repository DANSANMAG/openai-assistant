"use client";

import Chat from "@/components/chat";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-white p-4">
      <div
        className="resize overflow-auto border rounded-xl p-4 w-full max-w-[1200px] min-h-[400px] max-h-[90vh] shadow-md"
        style={{ resize: "both" }}
      >
        <Chat />
      </div>
    </main>
  );
}
