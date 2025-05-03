"use client";

import { useEffect, useRef } from "react";

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = "20px",
  duration = 800,
  once = true,
}) {
  const elementRef = useRef(null);
  const observerRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let translateFrom = "";
    switch (direction) {
      case "up":
        translateFrom = `translateY(${distance})`;
        break;
      case "down":
        translateFrom = `translateY(-${distance})`;
        break;
      case "left":
        translateFrom = `translateX(${distance})`;
        break;
      case "right":
        translateFrom = `translateX(-${distance})`;
        break;
    }

    element.style.opacity = "0";
    element.style.transform = translateFrom;
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    element.style.transitionDelay = `${delay}ms`;

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && (!once || !hasAnimated.current)) {
          element.style.opacity = "1";
          element.style.transform = "translate(0)";
          hasAnimated.current = true;

          if (once && observerRef.current) {
            observerRef.current.unobserve(element);
          }
        } else if (!entry.isIntersecting && !once && hasAnimated.current) {
          element.style.opacity = "0";
          element.style.transform = translateFrom;
          hasAnimated.current = false;
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: "0px",
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [delay, direction, distance, duration, once]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
