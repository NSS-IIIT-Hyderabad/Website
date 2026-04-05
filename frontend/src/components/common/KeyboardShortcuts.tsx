"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const navigationSequence = [
  { path: "/", label: "Home" },
  { path: "/events", label: "Events" },
  { path: "/members", label: "Team" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

export default function KeyboardShortcuts() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+< (which is Ctrl+,) and Ctrl+> (which is Ctrl+.)
      const isCtrlPressed = e.ctrlKey || e.metaKey; // metaKey for Mac
      
      if (!isCtrlPressed) return;

      // For Ctrl+< (previous): Ctrl+Shift+, or Ctrl+<
      // For Ctrl+> (next): Ctrl+Shift+. or Ctrl+>
      const key = e.key;

      let direction: "prev" | "next" | null = null;

      if (key === "<" || (e.shiftKey && key === ",")) {
        // Ctrl+<
        direction = "prev";
      } else if (key === ">" || (e.shiftKey && key === ".")) {
        // Ctrl+>
        direction = "next";
      }

      if (!direction) return;

      e.preventDefault();

      // Find current position
      const currentIndex = navigationSequence.findIndex(
        (item) => item.path === pathname
      );

      let nextIndex: number;

      if (direction === "next") {
        // Move to next page (wrap around to start if at end)
        nextIndex =
          currentIndex === -1
            ? 1
            : (currentIndex + 1) % navigationSequence.length;
      } else {
        // Move to previous page (wrap around to end if at start)
        nextIndex =
          currentIndex === -1
            ? navigationSequence.length - 1
            : (currentIndex - 1 + navigationSequence.length) % navigationSequence.length;
      }

      const nextPath = navigationSequence[nextIndex].path;
      router.push(nextPath);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pathname, router]);

  return null;
}
