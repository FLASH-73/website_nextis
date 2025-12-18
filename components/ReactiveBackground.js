"use client";

import { useEffect, useRef } from "react";

export default function ReactiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Mouse state
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let currentMouseX = -1000;
    let currentMouseY = -1000;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        targetMouseX = e.touches[0].clientX;
        targetMouseY = e.touches[0].clientY;
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchstart", handleTouchMove);

    handleResize();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Inertia: Smoothly interpolate current mouse pos towards target
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      const time = Date.now() * 0.001;

      // Global Lung Breathing - Center-out expansion
      const lungBreath = Math.sin(time * 1.5); // -1 to 1
      const expansionScale = 1.0 + lungBreath * 0.2;

      // Responsive scaling: Adjust spacing based on screen width
      // Base reference width is 3840px (4K). 
      // We scale down for smaller screens to maintain the "zoomed out" look (same density).
      // We clamp the scale at 0.4 to ensure dots don't become too small on mobile.
      const screenScale = Math.max(0.4, canvas.width / 3840);
      const baseSpacing = 50 * screenScale;
      const baseRadius = 2.5 * screenScale;

      // Ensure we cover the screen even when contracted (scale < 1)
      const cols = Math.ceil(canvas.width / (baseSpacing * 0.8)) + 6;
      const rows = Math.ceil(canvas.height / (baseSpacing * 0.8)) + 6;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.fillStyle = "rgba(0, 0, 0, 1)"; // Turquoise

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Calculate base position (centered grid)
          const baseX = (i - 3) * baseSpacing + baseSpacing / 2;
          const baseY = (j - 3) * baseSpacing + baseSpacing / 2;

          // Apply Global Breathing (Expansion from center)
          let x = centerX + (baseX - centerX) * expansionScale;
          let y = centerY + (baseY - centerY) * expansionScale;

          // ... (rest of the logic uses x, y, and scaled radius)

          // Calculate distance to mouse first to implement "Spotlight"
          const dxRaw = currentMouseX - x;
          const dyRaw = currentMouseY - y;
          const distRaw = Math.sqrt(dxRaw * dxRaw + dyRaw * dyRaw);

          // Dynamic Spotlight Shape - ORGANIC & ASYMMETRIC
          const angleToMouse = Math.atan2(dyRaw, dxRaw);

          // Complex Organic Morphing for OUTER Spotlight
          let shapeMod = 0;
          shapeMod += Math.cos(angleToMouse * 2 + time * 0.5) * (60 * screenScale);
          shapeMod += Math.sin(angleToMouse * 3 - time * 0.8) * (50 * screenScale);
          shapeMod += Math.cos(angleToMouse * 5 + time * 1.5) * (30 * screenScale);
          shapeMod += Math.sin(angleToMouse * 7 - time * 2.0) * (15 * screenScale);

          // Breathing radius global
          const radiusBreath = Math.sin(time * 1.5) * (40 * screenScale);

          // Global Lung Expansion applied to spotlight size as well
          const lungExpansion = lungBreath * (150 * screenScale);

          // Increased Spotlight Size
          const fadeRadius = (1000 * screenScale) + shapeMod + radiusBreath + lungExpansion;
          const cullRadius = fadeRadius + 100;

          if (distRaw > cullRadius) continue;

          // Heavy, Organic Breathing - NATURAL & ALIVE
          const t = time * 0.6;
          const noiseX = Math.sin(t + y * 0.05 + x * 0.01) * (20 * screenScale) + Math.cos(t * 0.3 + x * 0.02) * (15 * screenScale);
          const noiseY = Math.cos(t + x * 0.05 + y * 0.01) * (20 * screenScale) + Math.sin(t * 0.4 + y * 0.02) * (15 * screenScale);

          let drawX = x + noiseX;
          let drawY = y + noiseY;

          const breath = Math.sin(t * 3.0 + x * 0.005 + y * 0.005) * 0.5 + 0.5;
          let radius = baseRadius + breath * (3 * screenScale);

          // Recalculate distance for interaction based on the moved position
          const dx = currentMouseX - drawX;
          const dy = currentMouseY - drawY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Mouse Interaction
          if (distance < fadeRadius) {
            // Dynamic Repulsion Zone (The "dot free area")

            const repulsionAngle = Math.atan2(dy, dx);

            let repulsionShapeMod = 0;
            repulsionShapeMod += Math.sin(time * 3.0) * (20 * screenScale);
            repulsionShapeMod += Math.cos(repulsionAngle * 3 + time * 2.0) * (30 * screenScale);
            repulsionShapeMod += Math.sin(repulsionAngle * 7 - time * 1.5) * (15 * screenScale);

            // Base repulsion radius (the "empty" zone size)
            // Increased to 180 for larger empty space
            const baseRepulsionRadius = (180 * screenScale) + lungBreath * (20 * screenScale);
            const effectiveRepulsionRadius = baseRepulsionRadius + repulsionShapeMod;

            // Repulsion Falloff Limit
            // Increased to 800 for larger influence area
            const repulsionOuterRadius = 800 * screenScale; 

            // Calculate force
            let force = 0;
            if (distance < effectiveRepulsionRadius) {
              // Inside the organic hole: MAX force
              force = 1.0;
            } else if (distance < repulsionOuterRadius) {
              // Outside hole but inside repulsion outer limit
              const range = repulsionOuterRadius - effectiveRepulsionRadius;
              const distFromHole = distance - effectiveRepulsionRadius;
              force = Math.max(0, 1 - (distFromHole / range));
              force = Math.pow(force, 2);
            } else {
              force = 0;
            }

            // Organic noise for the angle of displacement
            const angleNoise = Math.sin(time * 2.0 + distance * 0.01) * 0.3;
            const angle = Math.atan2(dy, dx) + angleNoise;

            // Smooth but strong displacement
            // Increased to 500 for stronger push
            const moveDistance = force * (500 * screenScale);

            if (moveDistance > 0) {
              drawX -= Math.cos(angle) * moveDistance;
              drawY -= Math.sin(angle) * moveDistance;
            }

            // Fade out at the edges of the spotlight
            const alpha = Math.max(0, 1 - Math.pow(distRaw / fadeRadius, 8));
            ctx.globalAlpha = alpha;
          } else {
            ctx.globalAlpha = 0;
          }

          // Text Interaction (Nextis Title) - SOLID FLOW
          const titleElement = document.getElementById("nextis-title");
          if (titleElement) {
            const rect = titleElement.getBoundingClientRect();
            // Scale the cushion buffer with the screen size so it stays tight to the text
            // Reduced to 2 for tighter fit
            const cushionBuffer = 2 * screenScale;

            if (drawX > rect.left - cushionBuffer &&
              drawX < rect.right + cushionBuffer &&
              drawY > rect.top - cushionBuffer &&
              drawY < rect.bottom + cushionBuffer) {

              const bLeft = rect.left - cushionBuffer;
              const bRight = rect.right + cushionBuffer;
              const bTop = rect.top - cushionBuffer;
              const bBottom = rect.bottom + cushionBuffer;

              const dl = Math.abs(drawX - bLeft);
              const dr = Math.abs(drawX - bRight);
              const dt = Math.abs(drawY - bTop);
              const db = Math.abs(drawY - bBottom);

              const min = Math.min(dl, dr, dt, db);

              if (min === dl) drawX = bLeft;
              else if (min === dr) drawX = bRight;
              else if (min === dt) drawY = bTop;
              else if (min === db) drawY = bBottom;
            }
          }

          ctx.beginPath();
          ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0; // Reset alpha

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-white"
    />
  );
}
