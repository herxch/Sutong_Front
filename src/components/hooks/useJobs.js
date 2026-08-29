import { useCallback, useEffect, useState } from "react";
import { CAREERS_API } from "../config/jobs";

/**
 * The current openings, from OA.
 *
 * `status` is deliberately three-valued rather than a bare list. This page is on
 * the marketing site but the data comes from an on-prem server, so "we could not
 * reach it" is a real state and has to look different from "there are no
 * openings" — telling a candidate we are not hiring because a server was
 * rebooting would be worse than saying nothing.
 */
export default function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  const load = useCallback(() => {
    let cancelled = false;
    setStatus("loading");

    // The site should not sit spinning if the origin is unreachable.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    fetch(`${CAREERS_API}/jobs`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setJobs(Array.isArray(data) ? data : []);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      })
      .finally(() => clearTimeout(timer));

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => load(), [load]);

  return { jobs, status, reload: load };
}
