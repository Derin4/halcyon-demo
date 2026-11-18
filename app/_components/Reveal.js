"use client";

import { useEffect, useRef, useState } from "react";

// Fades content up when it scrolls into view. Set `curtain` to wipe an
// image open from the top instead.
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  curtain = false,
  className = "",
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${curtain ? "curtain" : "reveal"} ${shown ? "is-in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
