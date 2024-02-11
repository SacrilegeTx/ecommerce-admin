import { useState, useEffect } from "react";

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);

  let origin = null;

  if (typeof window !== "undefined") {
    // Accessing the window object safely
    origin = window.location.origin ? window.location.origin : "";
  } else {
    // Handle the case when running on the server-side
    console.log("==> Running on the server-side");
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return "";

  return origin;
};
