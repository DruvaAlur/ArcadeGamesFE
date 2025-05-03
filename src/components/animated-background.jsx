"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gridSize = 30;
    const gridWidth = Math.ceil(canvas.width / gridSize);
    const gridHeight = Math.ceil(canvas.height / gridSize);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);

    // Create grid points
    const points = [];
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        points.push({
          x: x * gridSize,
          y: y * gridSize,
          originalX: x * gridSize,
          originalY: y * gridSize,
          vx: 0,
          vy: 0,
        });
      }
    }

    let mouseX = 0;
    let mouseY = 0;
    const mouseRadius = 150;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines with a color that will be visible
      ctx.strokeStyle = "rgba(219, 39, 119, 0.3)"; // Using a pink color that should be visible
      ctx.lineWidth = 1.5;

      for (let i = 0; i < points.length; i++) {
        const point = points[i];

        // Calculate distance from mouse
        const dx = mouseX - point.x;
        const dy = mouseY - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Apply force if within radius
        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          const targetX = point.x - Math.cos(angle) * force * 20;
          const targetY = point.y - Math.sin(angle) * force * 20;

          point.vx += (targetX - point.x) * 0.1;
          point.vy += (targetY - point.y) * 0.1;
        }

        // Spring back to original position
        point.vx += (point.originalX - point.x) * 0.05;
        point.vy += (point.originalY - point.y) * 0.05;

        // Apply friction
        point.vx *= 0.9;
        point.vy *= 0.9;

        // Update position
        point.x += point.vx;
        point.y += point.vy;

        // Draw horizontal lines
        if (i % gridWidth !== gridWidth - 1) {
          const nextPoint = points[i + 1];
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);
          ctx.stroke();
        }

        // Draw vertical lines
        if (i < points.length - gridWidth) {
          const belowPoint = points[i + gridWidth];
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(belowPoint.x, belowPoint.y);
          ctx.stroke();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
