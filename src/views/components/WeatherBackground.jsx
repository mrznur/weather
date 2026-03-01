const THEMES = {
  clear: {
    base: "from-sky-500 via-sky-700 to-indigo-950",
    glow: "bg-yellow-300/25",
    accents: "bg-cyan-300/12",
    rain: false,
    snow: false,
  },
  partly: {
    base: "from-sky-700 via-indigo-900 to-slate-950",
    glow: "bg-amber-200/16",
    accents: "bg-sky-200/10",
    rain: false,
    snow: false,
  },
  cloud: {
    base: "from-slate-500 via-slate-700 to-slate-800",
    glow: "bg-white/10",
    accents: "bg-slate-300/10",
    rain: false,
    snow: false,
  },
  fog: {
    base: "from-slate-600 via-slate-800 to-slate-950",
    glow: "bg-white/8",
    accents: "bg-white/8",
    rain: false,
    snow: false,
  },
  rain: {
    base: "from-slate-800 via-slate-950 to-black",
    glow: "bg-cyan-300/10",
    accents: "bg-blue-300/10",
    rain: true,
    snow: false,
  },
  storm: {
    base: "from-slate-900 via-indigo-950 to-black",
    glow: "bg-violet-300/12",
    accents: "bg-indigo-300/10",
    rain: true,
    snow: false,
  },
  snow: {
    base: "from-slate-700 via-slate-900 to-slate-950",
    glow: "bg-white/12",
    accents: "bg-sky-200/10",
    rain: false,
    snow: true,
  },
  nightClear: {
    base: "from-slate-950 via-indigo-950 to-black",
    glow: "bg-white/10",
    accents: "bg-indigo-300/10",
    rain: false,
    snow: false,
  },
  nightCloud: {
    base: "from-slate-950 via-slate-950 to-black",
    glow: "bg-white/8",
    accents: "bg-slate-300/10",
    rain: false,
    snow: false,
  },
  nightRain: {
    base: "from-black via-slate-950 to-black",
    glow: "bg-cyan-200/10",
    accents: "bg-blue-200/10",
    rain: true,
    snow: false,
  },
  nightStorm: {
    base: "from-black via-indigo-950 to-black",
    glow: "bg-violet-200/10",
    accents: "bg-indigo-200/10",
    rain: true,
    snow: false,
  },
  nightSnow: {
    base: "from-slate-950 via-slate-950 to-black",
    glow: "bg-white/10",
    accents: "bg-sky-200/10",
    rain: false,
    snow: true,
  },
  nightFog: {
    base: "from-slate-950 via-slate-950 to-black",
    glow: "bg-white/8",
    accents: "bg-white/8",
    rain: false,
    snow: false,
  },
};

export default function WeatherBackground({ theme = "partly" }) {
  const t = THEMES[theme] || THEMES.partly;

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* gradient base */}
      <div className={`absolute inset-0 bg-gradient-to-b ${t.base}`} />

      {/* soft blobs */}
      <div
        className={`absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl ${t.glow} floaty`}
      />
      <div
        className={`absolute -bottom-28 -left-20 h-80 w-80 rounded-full blur-3xl ${t.accents} floaty`}
      />
      <div
        className={`absolute -bottom-40 -right-24 h-96 w-96 rounded-full blur-3xl ${t.accents} floaty`}
      />

      {/* subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22 opacity=%220.55%22/%3E%3C/svg%3E')",
        }}
      />

      {/* rain */}
      {t.rain && <RainLayer />}

      {/* snow */}
      {t.snow && <SnowLayer />}
    </div>
  );
}

function RainLayer() {
  return (
    <div className="absolute inset-0 opacity-30">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(120deg, rgba(255,255,255,0.14) 0px, rgba(255,255,255,0.14) 1px, rgba(255,255,255,0) 6px, rgba(255,255,255,0) 18px)",
          animation: "rainMove 1.2s linear infinite",
        }}
      />
      <style>{`
        @keyframes rainMove {
          from { transform: translateY(-30px); }
          to { transform: translateY(30px); }
        }
      `}</style>
    </div>
  );
}

function SnowLayer() {
  return (
    <div className="absolute inset-0 opacity-35">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.45) 1px, rgba(255,255,255,0) 2px)",
          backgroundSize: "26px 26px",
          animation: "snowMove 5s linear infinite",
        }}
      />
      <style>{`
        @keyframes snowMove {
          from { transform: translateY(-40px); }
          to { transform: translateY(40px); }
        }
      `}</style>
    </div>
  );
}
