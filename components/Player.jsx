"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function PlayerPage() {

  // IMPORTANT
  // YOUR ROUTE MUST BE:
  // app/p/[id]/page.js

  const { id } = useParams();

  const router = useRouter();

  const [album, setAlbum] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [projectInput, setProjectInput] = useState("");

  // LOAD PROJECT

  useEffect(() => {

    if (!id) {
      setLoading(false);
      return;
    }

    fetchProject(id);

  }, [id]);

  // FETCH PROJECT

  const fetchProject = async (shareCode) => {

    try {

      setLoading(true);
      setError("");

      console.log("SEARCHING SHARE CODE:", shareCode);

      const q = query(
        collection(db, "projects"),
        where("shareCode", "==", shareCode)
      );

      const snapshot = await getDocs(q);

      console.log("SNAPSHOT:", snapshot.size);

      if (snapshot.empty) {

        setAlbum(null);
        setError("Project not found.");

        return;
      }

      const data = snapshot.docs[0].data();

      console.log("PROJECT DATA:", data);

      setAlbum(data);

      // AUTO PLAY FIRST TRACK

      if (data.tracks && data.tracks.length > 0) {

        const playableTrack = data.tracks.find(
          (track) => track.audioURL
        );

        if (playableTrack) {
          setCurrentTrack(playableTrack);
        }

      }

    } catch (err) {

      console.error(err);

      setError("Failed to load project.");

    } finally {

      setLoading(false);

    }
  };

  // OPEN PROJECT

  const handleOpenProject = () => {

    if (!projectInput) return;

    let cleanCode = projectInput.trim();

    // FULL URL
    // https://y-gold-five.vercel.app/p/ba1f1f27

    if (cleanCode.includes("/p/")) {
      cleanCode = cleanCode.split("/p/")[1];
    }

    cleanCode = cleanCode.replace(/\//g, "");

    router.push(`/p/${cleanCode}`);
  };

  // LOADING

  if (loading) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center text-2xl font-bold">
        Loading PlayerBytez...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* TOP SEARCH */}

      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-white/10 p-4">

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-3">

          <input
            type="text"
            value={projectInput}
            onChange={(e) => setProjectInput(e.target.value)}
            placeholder="Paste project link or share code..."
            className="
              flex-1
              bg-white/5
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
              text-white
              outline-none
              focus:border-green-400
            "
          />

          <button
            onClick={handleOpenProject}
            className="
              px-6
              py-4
              rounded-2xl
              bg-green-500
              hover:bg-green-400
              text-black
              font-bold
              transition
            "
          >
            Open Project
          </button>

        </div>

      </div>

      {/* ERROR */}

      {error && (

        <div className="flex-1 flex items-center justify-center p-10 text-center">

          <div>

            <h1 className="text-4xl font-black mb-4">
              {error}
            </h1>

            <p className="text-gray-400">
              Try another share code.
            </p>

          </div>

        </div>

      )}

      {/* PLAYER */}

      {!error && album && (
        <>

          {/* HEADER */}

          <div className="relative h-[360px] w-full overflow-hidden">

            {album.artworkURL && (
              <img
                src={album.artworkURL}
                alt={album.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />

            <div className="relative h-full max-w-5xl mx-auto flex flex-col justify-end p-6">

              <p className="text-green-400 text-sm mb-2">
                PUBLIC PROJECT
              </p>

              <h1 className="text-5xl md:text-6xl font-black">
                {album.title}
              </h1>

              <p className="text-gray-300 mt-4">
                {album.tracks?.length || 0} Tracks
              </p>

              <div className="mt-4 flex gap-3 flex-wrap">

                <div className="bg-white/10 px-4 py-2 rounded-full text-sm">
                  Share Code: {album.shareCode}
                </div>

                <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">
                  Public
                </div>

              </div>

            </div>

          </div>

          {/* TRACK LIST */}

          <div className="flex-1 w-full max-w-5xl mx-auto p-6 space-y-4">

            {album.tracks?.map((track, index) => (

              <div
                key={track.id || index}
                onClick={() => {
                  if (track.audioURL) {
                    setCurrentTrack(track);
                  }
                }}
                className={`
                  group
                  p-4
                  rounded-3xl
                  border
                  flex
                  items-center
                  gap-4
                  transition-all
                  cursor-pointer
                  ${currentTrack?.id === track.id
                    ? "bg-green-500/10 border-green-400"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                  }
                `}
              >

                {/* NUMBER */}

                <div className="w-8 text-center text-gray-500 font-bold">
                  {index + 1}
                </div>

                {/* COVER */}

                {track.artworkURL ? (
                  <img
                    src={track.artworkURL}
                    alt={track.title}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-white/10" />
                )}

                {/* INFO */}

                <div className="flex-1 min-w-0">

                  <h2 className="text-xl font-bold truncate">
                    {track.title || "Untitled"}
                  </h2>

                  {track.participants && (
                    <p className="text-sm text-gray-400 mt-1 truncate">
                      {track.participants}
                    </p>
                  )}

                  {track.description && (
                    <p className="text-sm text-gray-500 mt-2 truncate">
                      {track.description}
                    </p>
                  )}

                </div>

                {/* STATUS */}

                <div className="text-sm">

                  {currentTrack?.id === track.id ? (
                    <span className="text-green-400 font-bold">
                      ▶ Playing
                    </span>
                  ) : (
                    <span className="text-gray-400">
                      Play
                    </span>
                  )}

                </div>

              </div>

            ))}

          </div>

          {/* AUDIO PLAYER */}

          {currentTrack && (

            <div className="sticky bottom-0 bg-black/95 backdrop-blur border-t border-white/10">

              <div className="max-w-5xl mx-auto p-4">

                <div className="flex items-center gap-4 mb-4">

                  {currentTrack.artworkURL && (
                    <img
                      src={currentTrack.artworkURL}
                      alt={currentTrack.title}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                  )}

                  <div className="min-w-0">

                    <h3 className="font-bold truncate">
                      {currentTrack.title}
                    </h3>

                    {currentTrack.participants && (
                      <p className="text-sm text-gray-400 truncate">
                        {currentTrack.participants}
                      </p>
                    )}

                  </div>

                </div>

                <audio
                  key={currentTrack.id}
                  controls
                  autoPlay
                  src={currentTrack.audioURL}
                  className="w-full"
                />

              </div>

            </div>

          )}

        </>
      )}

    </div>
  );
}