import { useEffect, useState } from "react";

export function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "LOCAL";
      const short = tz.split("/").pop()?.toUpperCase().slice(0, 6) ?? "LOCAL";
      const t = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setTime(`${short} · ${t}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="eyebrow tabular text-stone hidden md:inline-block">
      {time || "—"}
    </span>
  );
}
