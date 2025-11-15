"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

import { InteractiveObject } from "@/data/interactiveObjects";

interface SidebarClockProps {
  object: InteractiveObject;
}

const SidebarClock: React.FC<SidebarClockProps> = ({ object }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  // Animate title → text
  useGSAP(
    () => {
      if (!containerRef.current || !underlineRef.current) return;

      const underlineEl = underlineRef.current;

      const tl = gsap.timeline({ delay: 0.5 });

      // Animate underline (width reveal matching text)
      gsap.set(underlineEl, { transformOrigin: "left center", scaleX: 0 });
      tl.to(underlineEl, {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: containerRef, dependencies: [object] }
  );

  return (
    <div
      ref={containerRef}
      className="scrollbar scrollbar-none h-full space-y-4 overflow-hidden"
    >
      {/* Title */}
      <h2 className="sidebar-title mb-2 inline-block text-xl font-semibold lg:text-2xl">
        <span className="relative inline-block">
          {object.title}
          <span
            ref={underlineRef}
            className="underline-span bg-primary block h-px origin-left scale-x-0"
          />
        </span>
      </h2>
    </div>
  );
};

export default SidebarClock;
