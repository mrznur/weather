export function mapForecastToVM(raw, unit) {
  const loc = raw.location;
  const cur = raw.current;
  const days = raw.forecast?.forecastday ?? [];
  const isC = unit === "c";

  return {
    unit, // "c" | "f"
    locationLabel: `${loc.name}${loc.region ? ", " + loc.region : ""}, ${loc.country}`,
    meta: {
      localtime: loc.localtime,
      tz_id: loc.tz_id,
    },
    conditionCode: cur.condition?.code ?? 0,
    isDay: cur.is_day === 1,
    current: {
      temp: Math.round(isC ? cur.temp_c : cur.temp_f),
      feelsLike: Math.round(isC ? cur.feelslike_c : cur.feelslike_f),
      humidity: cur.humidity,
      wind: isC ? cur.wind_kph : cur.wind_mph,
      windUnit: isC ? "kph" : "mph",
      condition: cur.condition?.text ?? "",
      icon: normalizeIconUrl(cur.condition?.icon),
    },
    forecast: days.map((d) => ({
      date: d.date, // YYYY-MM-DD
      min: Math.round(isC ? d.day.mintemp_c : d.day.mintemp_f),
      max: Math.round(isC ? d.day.maxtemp_c : d.day.maxtemp_f),
      condition: d.day.condition?.text ?? "",
      icon: normalizeIconUrl(d.day.condition?.icon),
      code: d.day.condition?.code ?? 0,
    })),
  };
}

function normalizeIconUrl(icon) {
  if (!icon) return "";
  if (icon.startsWith("//")) return `https:${icon}`;
  if (icon.startsWith("http")) return icon;
  return `https://${icon}`;
}

export function formatDay(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(undefined, { weekday: "short" });
}

/**
 * Turn WeatherAPI condition code + day/night into a "theme"
 * Very simple mapping (good enough for UI background)
 */
export function getThemeFromCondition({ code, isDay }) {
  const night = !isDay;

  // Thunder
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) return night ? "nightStorm" : "storm";

  const snowCodes = [1066, 1069, 1072, 1114, 1117, 1147, 1150, 1153, 1168, 1171, 1198, 1201, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264];
  if (snowCodes.includes(code)) return night ? "nightSnow" : "snow";

  const rainCodes = [1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246];
  if (rainCodes.includes(code)) return night ? "nightRain" : "rain";

  const fogCodes = [1030, 1135, 1147];
  if (fogCodes.includes(code)) return night ? "nightFog" : "fog";

  if ([1006, 1009].includes(code)) return night ? "nightCloud" : "cloud";

  if ([1003].includes(code)) return night ? "nightCloud" : "partly";

  if ([1000].includes(code)) return night ? "nightClear" : "clear";

  return night ? "nightCloud" : "partly";
}