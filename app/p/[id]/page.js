"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function Page({ params }) {

  const id = params.id;

  const [album, setAlbum] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!id) return;

    const fetchProject = async () => {

      const q = query(
        collection(db, "projects"),
        where("shareCode", "==", id)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        setAlbum(data);

        const first = data.tracks?.find(t => t.audioURL);
        if (first) setCurrentTrack(first);
      }

      setLoading(false);
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

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold mb-6">
        {album?.title}
      </h1>

      {album?.tracks?.map((t) => (
        <div
          key={t.id}
          onClick={() => setCurrentTrack(t)}
          className="p-4 bg-white/5 rounded-xl mb-3 cursor-pointer"
        >
          {t.title}
        </div>
      ))}

      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 p-4">
          <audio controls autoPlay src={currentTrack.audioURL} className="w-full" />
        </div>
      )}

    </div>
  );
}