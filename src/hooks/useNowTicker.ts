import { useEffect, useState } from "react";

/** Updates every second for live clock labels. */
export function useNowTicker() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return now;
}
