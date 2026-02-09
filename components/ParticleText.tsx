import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ParticleTextProps {
  text: string;
  className?: string;
  particleCount?: number;
  particleSize?: number;
  particleSpeed?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

const ParticleText: React.FC<ParticleTextProps> = ({
  text,
  className = '',
  particleCount = 50,
  particleSize = 3,
  particleSpeed = 0.5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const colors = ['#00F0FF', '#8B00FF', '#FFFFFF', '#00F0FF', '#8B00FF'];

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isHovered) {
      particlesRef.current = [];
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx * particleSpeed;
        particle.y += particle.vy * particleSpeed;
        particle.life--;

        const opacity = particle.life / particle.maxLife;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * opacity, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
        ctx.fill();

        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;

        return particle.life > 0;
      });

      // Spawn new particles near mouse
      if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
        for (let i = 0; i < 2; i++) {
          if (particlesRef.current.length < particleCount) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 2 + 1;
            particlesRef.current.push({
              x: mouseRef.current.x + (Math.random() - 0.5) * 100,
              y: mouseRef.current.y + (Math.random() - 0.5) * 50,
              vx: Math.cos(angle) * velocity,
              vy: Math.sin(angle) * velocity,
              life: Math.random() * 60 + 30,
              maxLife: 90,
              size: Math.random() * particleSize + 1,
              color: colors[Math.floor(Math.random() * colors.length)],
            });
          }
        }
      }

      ctx.shadowBlur = 0;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, particleCount, particleSize, particleSpeed]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ width: '100%', height: '100%' }}
      />
      <motion.h2
        ref={textRef}
        className={`relative z-0 ${className}`}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
        style={{
          textShadow: isHovered
            ? '0 0 30px rgba(0, 240, 255, 0.5), 0 0 60px rgba(139, 0, 255, 0.3)'
            : 'none',
        }}
      >
        {text}
      </motion.h2>
    </div>
  );
};

export default ParticleText;
