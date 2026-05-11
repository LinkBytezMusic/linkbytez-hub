"use client";

import { useEffect, useState } from "react";
import { getProjectByCode } from "@/api";

export default function Player({ id }: { id: string }) {
  const [album, setAlbum] = useState<any>(null);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getProjectByCode(id);

        if (!data) {
          setError("Project not found");
          return;
        }

        setAlbum(data);
        setCurrentTrack(data.tracks?.[0]);
      } catch {
        setError("Error loading project");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) return <div className="p-10 text-white">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">{album.title}</h1>

      {album.tracks?.map((t: any) => (
        <div
          key={t.id}
          onClick={() => setCurrentTrack(t)}
          className="p-3 bg-white/5 mb-2 rounded cursor-pointer"
        >
          {t.title}
        </div>
      ))}

      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black border-t">
          <audio controls autoPlay src={currentTrack.audioURL} />
        </div>
      )}
    </div>
  );
}