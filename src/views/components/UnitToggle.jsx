export default function UnitToggle({ unit, setUnit }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur">
      <button
        className={
          "rounded-xl px-4 py-2 text-sm font-extrabold transition " +
          (unit === "c"
            ? "bg-white/15 border border-white/15"
            : "bg-transparent border border-white/10 hover:bg-white/10")
        }
        onClick={() => setUnit("c")}
      >
        °C
      </button>
      <button
        className={
          "rounded-xl px-4 py-2 text-sm font-extrabold transition " +
          (unit === "f"
            ? "bg-white/15 border border-white/15"
            : "bg-transparent border border-white/10 hover:bg-white/10")
        }
        onClick={() => setUnit("f")}
      >
        °F
      </button>
    </div>
  );
}