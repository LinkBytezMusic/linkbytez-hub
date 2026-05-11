export default function TrackList({ tracks, onSelect }: any) {
  return (
    <div>
      {tracks?.map((t: any) => (
        <div
          key={t.id}
          onClick={() => onSelect(t)}
          className="p-3 bg-white/5 mb-2 rounded cursor-pointer"
        >
          {t.title}
        </div>
      ))}
    </div>
  );
}