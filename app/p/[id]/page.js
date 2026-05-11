"use client";

import Player from "@/components/Player";

export default function Page({ params }) {
  return <Player id={params.id} />;
}