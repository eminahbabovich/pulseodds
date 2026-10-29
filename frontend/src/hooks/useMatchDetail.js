import { useEffect, useState } from "react";
import { fetchMatch } from "../api";

export function useMatchDetail(id) {
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return undefined;
    const controller = new AbortController();
    fetchMatch(id, controller.signal)
      .then(setDetail)
      .catch(reason => {
        if (reason.name !== "AbortError") setError(reason.message);
      });
    return () => controller.abort();
  }, [id]);

  return { detail, error };
}
