import { useWeatherController } from "../../controllers/useWeatherController.js";
import WeatherBackground from "../components/WeatherBackground.jsx";
import SearchBar from "../components/SearchBar.jsx";
import UnitToggle from "../components/UnitToggle.jsx";
import CurrentWeatherCard from "../components/CurrentWeatherCard.jsx";
import ForecastList from "../components/ForecastList.jsx";
import LoadingState from "../components/LoadingState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import { getThemeFromCondition } from "../../models/weatherMapper.js";

export default function HomePage() {
  const ctrl = useWeatherController();
  const theme = ctrl.vm
    ? getThemeFromCondition({ code: ctrl.vm.conditionCode, isDay: ctrl.vm.isDay })
    : "partly";

  return (
    <div className="relative min-h-screen overflow-hidden">
      <WeatherBackground theme={theme} />

      <div className="relative mx-auto max-w-5xl px-4 py-8">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Weather Forecast
            </h1>
            <p className="mt-1 text-sm text-white/70">
              Search any city worldwide 🌍
            </p>
          </div>

          <UnitToggle unit={ctrl.unit} setUnit={ctrl.setUnit} />
        </header>

        <div className="mt-4">
          <SearchBar
            value={ctrl.query}
            onChange={ctrl.setQuery}
            onSearch={() => ctrl.load(ctrl.query)}
            suggestions={ctrl.suggestions}
            suggOpen={ctrl.suggOpen}
            setSuggOpen={ctrl.setSuggOpen}
            onPickSuggestion={(label) => {
              ctrl.setQuery(label);
              ctrl.load(label);
            }}
          />
        </div>

        <div className="mt-4">
          {ctrl.status === "loading" && <LoadingState />}
          {ctrl.status === "error" && <ErrorState message={ctrl.error} />}
        </div>

        {ctrl.status === "success" && ctrl.vm && (
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <CurrentWeatherCard vm={ctrl.vm} />
            <ForecastList vm={ctrl.vm} />
          </div>
        )}

        <footer className="mt-8 text-xs text-white/50">
          Data: WeatherAPI |•| Built with React + Tailwind
        </footer>
      </div>
    </div>
  );
}