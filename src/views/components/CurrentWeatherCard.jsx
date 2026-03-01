export default function CurrentWeatherCard({ vm }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold">{vm.locationLabel}</h2>
          <p className="mt-1 text-sm font-semibold text-white/85">
            {vm.current.condition}
          </p>
          <p className="mt-1 text-xs text-white/60">
            Local time: {vm.meta.localtime}
          </p>
        </div>

        {vm.current.icon && (
          <img
            src={vm.current.icon}
            alt={vm.current.condition}
            className="h-20 w-20"
          />
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="text-5xl font-semibold tracking-tight">
          {vm.current.temp}°{vm.unit.toUpperCase()}
        </div>

        <div className="text-sm text-white/80">
          <div className="leading-7">
            Feels like:{" "}
            <span className="font-semibold">
              {vm.current.feelsLike}°{vm.unit.toUpperCase()}
            </span>
          </div>
          <div className="leading-7">
            Humidity:{" "}
            <span className="font-semibold">{vm.current.humidity}%</span>
          </div>
          <div className="leading-7">
            Wind:{" "}
            <span className="font-semibold">
              {vm.current.wind} {vm.current.windUnit}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}