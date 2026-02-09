import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LiquidTextProps {
  text: string;
  className?: string;
}

const LiquidText: React.FC<LiquidTextProps> = ({ text, className = '' }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const filterRef = useRef<SVGFilterElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) / rect.width;
        mouseY = (e.clientY - rect.top) / rect.height;
      }
    };

    const handleMouseEnter = () => {
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    const animate = () => {
      if (turbulenceRef.current && displacementRef.current) {
        if (isHovering) {
          // Active liquid distortion while hovering - continuous animation
          const time = Date.now() * 0.002;
          const freqX = 0.02 + Math.sin(time) * 0.015;
          const freqY = 0.03 + Math.cos(time * 0.8) * 0.015;
          turbulenceRef.current.setAttribute('baseFrequency', `${freqX} ${freqY}`);

          // Higher displacement for more dramatic liquid effect
          const scale = 40 + Math.sin(time * 1.5) * 15;
          displacementRef.current.setAttribute('scale', scale.toString());
        } else {
          // Keep some distortion even when not hovering - very subtle
          const time = Date.now() * 0.0005;
          const freqX = 0.01 + Math.sin(time) * 0.002;
          const freqY = 0.02 + Math.cos(time * 0.7) * 0.002;
          turbulenceRef.current.setAttribute('baseFrequency', `${freqX} ${freqY}`);
          displacementRef.current.setAttribute('scale', '5');
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    const svg = svgRef.current;
    if (svg) {
      svg.addEventListener('mousemove', handleMouseMove);
      svg.addEventListener('mouseenter', handleMouseEnter);
      svg.addEventListener('mouseleave', handleMouseLeave);
    }

    animate();

    return () => {
      if (svg) {
        svg.removeEventListener('mousemove', handleMouseMove);
        svg.removeEventListener('mouseenter', handleMouseEnter);
        svg.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`w-full h-auto cursor-pointer ${className}`}
      viewBox="0 0 400 120"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter ref={filterRef} id="liquid-filter">
          {/* Turbulence for the liquid effect */}
          <feTurbulence
            ref={turbulenceRef}
            type="fractalNoise"
            baseFrequency="0.01 0.02"
            numOctaves="3"
            result="noise"
            seed="1"
          />
          {/* Displacement map to apply the turbulence */}
          <feDisplacementMap
            ref={displacementRef}
            in="SourceGraphic"
            in2="noise"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          {/* Color matrix for cyan/purple shift */}
          <feColorMatrix
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 18 -7
            "
            result="goo"
          />
          {/* Blend with original */}
          <feBlend in="SourceGraphic" in2="goo" mode="multiply" />
        </filter>

        {/* Gradient definition */}
        <linearGradient id="liquid-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00F0FF">
            <animate
              attributeName="stop-color"
              values="#00F0FF;#8B00FF;#00F0FF"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" stopColor="#8B00FF">
            <animate
              attributeName="stop-color"
              values="#8B00FF;#00F0FF;#8B00FF"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#00F0FF">
            <animate
              attributeName="stop-color"
              values="#00F0FF;#8B00FF;#00F0FF"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background text (subtle) */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-8xl font-black"
        fill="rgba(255,255,255,0.05)"
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        {text}
      </text>

      {/* Main liquid text */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-8xl font-black"
        fill="url(#liquid-gradient)"
        filter="url(#liquid-filter) url(#glow)"
        style={{
          fontFamily: 'Syne, sans-serif',
          letterSpacing: '-0.05em',
        }}
      >
        {text}
      </text>

      {/* Overlay text for sharpness */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-8xl font-black"
        fill="white"
        fillOpacity="0.3"
        style={{
          fontFamily: 'Syne, sans-serif',
          letterSpacing: '-0.05em',
          mixBlendMode: 'overlay',
        }}
      >
        {text}
      </text>
    </svg>
  );
};

export default LiquidText;
