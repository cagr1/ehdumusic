import React, { useEffect, useRef } from 'react';

interface LiquidTextProps {
  text: string;
  className?: string;
}

const LiquidText: React.FC<LiquidTextProps> = ({ text, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    let originalData: ImageData | null = null;
    let originalPixels: Uint8ClampedArray | null = null;
    let opaquePixelIndices: number[] = [];
    let animationId = 0;

    let hoverActive = false;
    let mouseX = 0;
    let mouseY = 0;
    let smoothX = 0;
    let smoothY = 0;

    let mobilePhase = 0;
    let timePhase = 0;

    const drawStyledText = (offsetX = 0) => {
      const cssWidth = canvas.width / dpr;
      const cssHeight = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const isSmallScreen = isCoarsePointer || cssWidth < 768;
      const maxByHeight = cssHeight * (isSmallScreen ? 0.72 : 0.82);
      const maxByWidth = cssWidth * (isSmallScreen ? 0.3 : 0.34);
      const fontSize = Math.min(maxByHeight, maxByWidth);
      ctx.font = `900 ${fontSize}px Syne, Arial Black, Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const centerX = cssWidth / 2 + offsetX;
      const centerY = cssHeight / 2 + fontSize * 0.03;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillText(text, centerX, centerY);

      const grad = ctx.createLinearGradient(0, 0, cssWidth, 0);
      grad.addColorStop(0, '#00F0FF');
      grad.addColorStop(0.5, '#8B00FF');
      grad.addColorStop(1, '#00F0FF');

      ctx.shadowBlur = 14;
      ctx.shadowColor = 'rgba(0, 240, 255, 0.42)';
      ctx.fillStyle = grad;
      ctx.fillText(text, centerX, centerY);
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';

      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillText(text, centerX, centerY);
    };

    const drawBase = () => {
      const rect = wrapper.getBoundingClientRect();
      const cssWidth = Math.max(1, Math.floor(rect.width));
      const cssHeight = Math.max(1, Math.floor(rect.height));

      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;

      drawStyledText();

      originalData = ctx.getImageData(0, 0, cssWidth, cssHeight);
      originalPixels = new Uint8ClampedArray(originalData.data);

      opaquePixelIndices = [];
      for (let i = 3; i < originalPixels.length; i += 4) {
        if (originalPixels[i] > 0) {
          opaquePixelIndices.push(i - 3);
        }
      }

      mouseX = cssWidth / 2;
      mouseY = cssHeight / 2;
      smoothX = mouseX;
      smoothY = mouseY;
    };

    const renderDistortion = (mx: number, my: number, tPhase: number) => {
      if (!originalData || !originalPixels) return;

      const width = originalData.width;
      const height = originalData.height;

      const result = ctx.createImageData(width, height);
      const out = result.data;
      // Keep original glyph pixels as base to avoid black holes under cursor.
      out.set(originalPixels);

      const radius = Math.min(width, height) * 0.48;
      const strength = Math.min(width, height) * 0.16;
      const swirl = Math.min(width, height) * 0.065;
      const deadZone = radius * 0.06;

      for (let n = 0; n < opaquePixelIndices.length; n += 1) {
        const srcIndex = opaquePixelIndices[n];
        const pixelId = srcIndex / 4;
        const x = pixelId % width;
        const y = Math.floor(pixelId / width);

        const dx = x - mx;
        const dy = y - my;
        const dist = Math.hypot(dx, dy);

        let tx = x;
        let ty = y;

        if (dist > deadZone && dist < radius) {
          // Break into particle-like shards with radial push + tangential swirl.
          const t = (radius - dist) / radius;
          const angle = Math.atan2(dy, dx);
          const radialForce = t * t * strength;
          const swirlForce = t * swirl * Math.sin(tPhase * 2.6 + dist * 0.09);

          tx = Math.round(x + Math.cos(angle) * radialForce - Math.sin(angle) * swirlForce);
          ty = Math.round(y + Math.sin(angle) * radialForce + Math.cos(angle) * swirlForce);

          // Remove original pixel in influence zone so text visibly "breaks".
          out[srcIndex + 3] = 0;

          // Density noise to create granular particle breakup.
          const noise = Math.abs(
            Math.sin((x * 12.9898 + y * 78.233 + tPhase * 130) * 0.017) * 43758.5453
          ) % 1;
          const keep = noise < (0.35 + t * 0.55);
          if (!keep) continue;
        }

        if (tx >= 0 && tx < width && ty >= 0 && ty < height) {
          const dstIndex = (ty * width + tx) * 4;
          out[dstIndex] = originalPixels[srcIndex];
          out[dstIndex + 1] = originalPixels[srcIndex + 1];
          out[dstIndex + 2] = originalPixels[srcIndex + 2];
          const alphaBase = originalPixels[srcIndex + 3];
          const alphaBoost = dist < radius ? 0.72 : 1;
          out[dstIndex + 3] = Math.min(255, Math.round(alphaBase * alphaBoost));
        }
      }

      ctx.putImageData(result, 0, 0);
    };

    const renderBase = () => {
      if (!originalData) return;
      ctx.putImageData(originalData, 0, 0);
    };

    const animate = () => {
      timePhase += 0.016;
      if (isCoarsePointer) {
        // Mobile behavior: centered text with subtle horizontal motion (no magnet distortion).
        mobilePhase += 0.02;
        const drift = Math.sin(mobilePhase) * (canvas.width / dpr) * 0.035;
        drawStyledText(drift);
      } else if (hoverActive) {
        // Smooth pointer for less jitter and more premium feel.
        smoothX += (mouseX - smoothX) * 0.2;
        smoothY += (mouseY - smoothY) * 0.2;
        renderDistortion(smoothX, smoothY, timePhase);
      } else {
        renderBase();
      }

      animationId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onMouseEnter = () => {
      hoverActive = true;
    };

    const onMouseLeave = () => {
      hoverActive = false;
    };

    const ro = new ResizeObserver(() => {
      drawBase();
    });

    ro.observe(wrapper);
    drawBase();

    if (!isCoarsePointer) {
      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('mouseenter', onMouseEnter);
      canvas.addEventListener('mouseleave', onMouseLeave);
    }

    animate();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseenter', onMouseEnter);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [text]);

  return (
    <div ref={wrapperRef} className={`relative w-full h-full ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default LiquidText;
