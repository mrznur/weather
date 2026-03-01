export default function ErrorState({ message }) {
  return (
    <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-4 backdrop-blur">
      <div className="text-sm font-extrabold">Couldn’t load weather</div>
      <div className="mt-1 text-sm text-white/85">{message}</div>
    </div>
  );
}