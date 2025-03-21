"use client";

import { useState } from "react";
import Chat from "@/components/chat";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center gap-[5vw]">
      <div className="w-full h-full flex-grow basis-3/5">
        <Chat />
      </div>
    </main>
  );
}

