"use client";

import { useEffect } from "react";

export default function TrackVisit() {
  useEffect(() => {
    fetch("/api/track", { method: "POST" }).catch(() => {});
  }, []);

  return null;
}
