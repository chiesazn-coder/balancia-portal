import React from "react";
import { Sun, Cloud, CloudRain, CloudLightning, Waves } from "lucide-react";
import Link from "next/link";

// Komponen Ikon Dinamis
function WeatherIcon({ status }: { status: string }) {
  const iconProps = { size: 20 };
  
  switch (status.toLowerCase()) {
    case "sunny":
      return <Sun {...iconProps} className="text-orange-500" />;
    case "cloudy":
      return <Cloud {...iconProps} className="text-blue-400" />;
    case "light rain":
      return <CloudRain {...iconProps} className="text-blue-500" />;
    case "thunderstorm":
      return <CloudLightning {...iconProps} className="text-purple-500" />;
    default:
      return <Waves {...iconProps} className="text-blue-600" />;
  }
}

export default function WeatherWidget() {
  // Data simulasi (nanti bisa di-fetch dari API)
  const weatherData = [
    { port: "Batam", temp: "29°C", status: "Cloudy", wind: "12 kts" },
    { port: "Surabaya", temp: "31°C", status: "Sunny", wind: "8 kts" },
    { port: "Jakarta", temp: "28°C", status: "Light Rain", wind: "15 kts" },
  ];

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-2">
          <Waves size={18} className="text-blue-600" />
          <span className="text-sm font-bold text-neutral-900 font-serif">Maritime Weather</span>
        </div>
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
          Live
        </span>
      </div>

      <div className="mt-4 space-y-4">
        {weatherData.map((w) => (
          <div key={w.port} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-50">
                <WeatherIcon status={w.status} />
              </div>
              <div>
                <div className="text-sm font-semibold text-neutral-900">{w.port}</div>
                <div className="text-[11px] text-neutral-500">{w.status} • {w.wind}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-neutral-900">{w.temp}</div>
            </div>
          </div>
        ))}
      </div>

      <Link 
        href="https://maritim.bmkg.go.id/" 
        target="_blank"
        className="mt-5 flex w-full items-center justify-center rounded-xl bg-neutral-50 py-2 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100"
      >
        Source: BMKG Maritim →
      </Link>
    </div>
  );
}