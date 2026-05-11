import Player from "@/components/Player";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <Player id={id} />;
}