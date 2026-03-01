import { useEffect, useRef, useState } from "react";

export default function SearchBar({
  value,
  onChange,
  onSearch,
  suggestions = [],
  suggOpen,
  setSuggOpen,
  onPickSuggestion,
}) {
  const [local, setLocal] = useState(value);
  const wrapRef = useRef(null);

  useEffect(() => setLocal(value), [value]);

  useEffect(() => {
    const onDoc = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setSuggOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [setSuggOpen]);

  return (
    <div ref={wrapRef} className="relative">
      <div className="flex gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
        <input
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/20"
          placeholder="Type a city (e.g., Dhaka, Tokyo, New York)"
          value={local}
          onChange={(e) => {
            const v = e.target.value;
            setLocal(v);
            onChange(v);
          }}
          onFocus={() => suggestions.length && setSuggOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch();
            if (e.key === "Escape") setSuggOpen(false);
          }}
        />
        <button
          className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-extrabold hover:bg-white/15 active:scale-[0.99]"
          onClick={onSearch}
        >
          Search
        </button>
      </div>

      {suggOpen && suggestions.length > 0 && (
        <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur">
          {suggestions.map((s) => {
            const label = `${s.name}${s.region ? ", " + s.region : ""}, ${s.country}`;
            return (
              <button
                key={`${s.id ?? label}`}
                className="block w-full px-4 py-3 text-left text-sm text-white/85 hover:bg-white/10"
                onClick={() => onPickSuggestion(label)}
              >
                <div className="font-semibold">{s.name}</div>
                <div className="text-xs text-white/55">
                  {s.region ? `${s.region}, ` : ""}{s.country}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}