"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {

  const router = useRouter();

  const [link, setLink] = useState("");

  const openProject = () => {

    if (!link) return;

    let clean = link.trim();

    // FULL URL
    // https://y-gold-five.vercel.app/p/ba1f1f27

    if (clean.includes("/p/")) {
      clean = clean.split("/p/")[1];
    }

    clean = clean.replace(/\//g, "");

    router.push(`/p/${clean}`);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2000')] bg-cover bg-center opacity-20" />

        <div className="absolute inset-0 bg-black/70" />

      </div>

      {/* CONTENT */}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">

        {/* LOGO */}

        <div className="mb-6 text-green-400 text-sm tracking-[10px] font-bold">
          LINKBYTEZ
        </div>

        {/* TITLE */}

        <h1 className="text-6xl md:text-8xl font-black text-center leading-none">

          MUSIC
          <br />
          PLAYER

        </h1>

        {/* SUB */}

        <p className="mt-6 text-gray-400 text-center max-w-xl text-lg">

          Open exclusive music projects, albums,
          demos and collaborations directly from LinkBytez.

        </p>

        {/* INPUT */}

        <div className="mt-10 w-full max-w-2xl flex flex-col md:flex-row gap-4">

          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Paste project link or share code..."
            className="
              flex-1
              bg-white/5
              border
              border-white/10
              rounded-2xl
              px-6
              py-5
              text-white
              outline-none
              focus:border-green-400
            "
          />

          <button
            onClick={openProject}
            className="
              px-8
              py-5
              rounded-2xl
              bg-green-400
              text-black
              font-black
              hover:scale-105
              transition
            "
          >
            ENTER
          </button>

        </div>

        {/* FOOTER */}

        <p className="mt-10 text-xs text-gray-500">
          Powered by LinkBytez
        </p>

      </div>

    </div>
  );
}