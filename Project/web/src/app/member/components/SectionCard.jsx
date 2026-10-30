"use client";
import React from "react";

export default function SectionCard({ handle, item }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (handle && ref.current) handle.setCard(ref.current, item);
  }, [handle, item]);

  React.useEffect(() => {
    const el = ref.current;
    return () => {
      if (handle && el) handle.removeCard(el);
    };
  }, [handle]);

  return <div ref={ref} style={{ minHeight: handle ? 0 : 260 }} />;
}
