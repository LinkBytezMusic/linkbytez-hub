"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Page({ params }) {

  const id = params?.id;

  const [album, setAlbum] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {

        setLoading(true);
        setError("");

        const q = query(
          collection(db, "projects"),
          where("shareCode", "==", id)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setError("Project not found");
          return;
        }

        const data = snapshot.docs[0].data();
        setAlbum(data);

        const first = data.tracks?.find(t => t.audioURL);
        if (first) setCurrentTrack(first);

      } catch (err) {
        console.error(err);
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();

  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold mb-6">
        {album?.title}
      </h1>

      {album?.tracks?.map((track) => (
        <div
          key={track.id}
          onClick={() => setCurrentTrack(track)}
          className="p-4 bg-white/5 rounded-xl mb-3 cursor-pointer hover:bg-white/10"
        >
          {track.title}
        </div>
      ))}

      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 p-4">
          <audio
            controls
            autoPlay
            src={currentTrack.audioURL}
            className="w-full"
          />
        </div>
      )}

    </div>
  );
}