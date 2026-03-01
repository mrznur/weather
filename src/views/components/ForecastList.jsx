import { formatDay } from "../../models/weatherMapper.js";

export default function ForecastList({ vm }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <h3 className="text-sm font-extrabold text-white/90">7-day forecast</h3>

      <div className="mt-4 space-y-2">
        {vm.forecast.map((d) => (
          <div
            key={d.date}
            className="grid grid-cols-[72px_1fr_120px] items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-3 py-2"
          >
            <div className="text-sm font-extrabold text-white/90">
              {formatDay(d.date)}
            </div>

            <div className="flex items-center gap-2">
              {d.icon && (
                <img src={d.icon} alt={d.condition} className="h-10 w-10" />
              )}
              <div className="text-sm text-white/80">{d.condition}</div>
            </div>

            <div className="justify-self-end text-sm">
              <span className="font-extrabold">
                {d.max}°{vm.unit.toUpperCase()}
              </span>
              <span className="ml-2 text-white/60">
                {d.min}°{vm.unit.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}