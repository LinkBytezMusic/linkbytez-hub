"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomeView() {

  const router = useRouter();
  const [link, setLink] = useState("");

  const openProject = () => {
    if (!link) return;

    let clean = link.trim();

    if (clean.includes("/p/")) {
      clean = clean.split("/p/")[1];
    }

    clean = clean.replace(/\//g, "");

    router.push(`/p/${clean}`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">

      <h1 className="text-5xl font-black mb-6">
        LINKBYTEZ
      </h1>

      <input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Paste project link"
        className="p-4 rounded-xl bg-white/10 w-80 mb-4"
      />

      <button
        onClick={openProject}
        className="px-6 py-3 bg-green-400 text-black font-bold rounded-xl"
      >
        ENTER
      </button>

    </div>
  );
}