import { useCallback, useEffect, useState } from "react";
import { fetchMatches } from "../api";

export function useMatches(interval = 5000) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async (signal) => {
    try {
      const data = await fetchMatches(signal);
      setMatches(data);
      setError("");
    } catch (reason) {
      if (reason.name !== "AbortError") setError(reason.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    refresh(controller.signal);
    const timer = window.setInterval(() => refresh(), interval);
    return () => {
      controller.abort();
      window.clearInterval(timer);
    };
  }, [interval, refresh]);

  return { matches, loading, error, refresh };
}
