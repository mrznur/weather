import { useCallback, useEffect, useMemo, useState } from "react";
import { getForecast, searchLocations } from "../models/weatherApi.js";
import { mapForecastToVM } from "../models/weatherMapper.js";

export function useWeatherController() {
  const [query, setQuery] = useState("Dhaka");
  const [unit, setUnit] = useState("c"); // "c" | "f"
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");
  const [vm, setVm] = useState(null);

  // (optional) suggestions
  const [suggestions, setSuggestions] = useState([]);
  const [suggOpen, setSuggOpen] = useState(false);

  const load = useCallback(
    async (q = query) => {
      try {
        setStatus("loading");
        setError("");
        setSuggOpen(false);

        const raw = await getForecast({ q, days: 7, aqi: "no", alerts: "no" });
        const mapped = mapForecastToVM(raw, unit);

        setVm(mapped);
        setStatus("success");
      } catch (e) {
        setStatus("error");
        setError(e?.message || "Something went wrong.");
      }
    },
    [query, unit]
  );

  // initial + unit change reload
  useEffect(() => {
    load("Dhaka");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]);

  // simple suggestions (debounced)
  useEffect(() => {
    let t = null;

    const q = query.trim();
    if (q.length < 2) {
      setSuggestions([]);
      setSuggOpen(false);
      return;
    }

    t = setTimeout(async () => {
      try {
        const data = await searchLocations({ q });
        setSuggestions((data || []).slice(0, 6));
        setSuggOpen(true);
      } catch {
        // ignore suggestion errors
        setSuggestions([]);
        setSuggOpen(false);
      }
    }, 250);

    return () => clearTimeout(t);
  }, [query]);

  const unitLabel = useMemo(() => (unit === "c" ? "°C" : "°F"), [unit]);

  return {
    query,
    setQuery,
    unit,
    setUnit,
    unitLabel,
    status,
    error,
    vm,
    load,

    suggestions,
    suggOpen,
    setSuggOpen,
  };
}