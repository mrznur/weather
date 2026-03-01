export default function LoadingState() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-white/80" />
        <div className="text-sm font-bold text-white/85">Loading forecast…</div>
      </div>
    </div>
  );
}