
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Fixed: Added initial value undefined to satisfy useRef<T>(initialValue) overload
  const animationRef = useRef<number | undefined>(undefined);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const p = (audio.currentTime / audio.duration) * 100;
      setProgress(p);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  // Simple Visualizer Effect
  useEffect(() => {
    if (!isPlaying) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 40;
      const barWidth = canvas.width / bars;
      
      for (let i = 0; i < bars; i++) {
        const h = 5 + Math.random() * (isPlaying ? 40 : 10);
        ctx.fillStyle = i % 2 === 0 ? '#8B00FF' : '#00F0FF';
        ctx.fillRect(i * barWidth + 1, canvas.height - h, barWidth - 2, h);
      }
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="glass-card p-6 rounded-2xl w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-transparent pointer-events-none" />
      
      {/* Album Art */}
      <div className="relative w-48 h-48 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
        <img 
          src="https://picsum.photos/seed/nebula/400/400" 
          alt="Album Art" 
          className="w-full h-full object-cover rounded-lg shadow-2xl"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
           <Play className="text-white w-12 h-12" />
        </div>
      </div>

      <div className="flex-1 w-full space-y-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-white">NEBULA</h3>
          <p className="text-cyan-400 uppercase text-xs font-bold tracking-widest mt-1">LATEST RELEASE • OUT NOW</p>
        </div>

        {/* Visualizer */}
        <div className="h-16 w-full opacity-50">
          <canvas ref={canvasRef} width={600} height={100} className="w-full h-full" />
        </div>

        {/* Progress */}
        <div className="relative h-1 bg-white/10 rounded-full cursor-pointer">
          <div 
            className="absolute top-0 left-0 h-full bg-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.8)]" 
            style={{ width: `${progress}%` }} 
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="text-white/50 hover:text-white transition-colors"><SkipBack size={20} /></button>
            <button 
              onClick={togglePlay}
              className="bg-white text-black p-3 rounded-full hover:scale-110 transition-transform active:scale-95"
            >
              {isPlaying ? <Pause fill="black" size={24} /> : <Play fill="black" size={24} />}
            </button>
            <button className="text-white/50 hover:text-white transition-colors"><SkipForward size={20} /></button>
          </div>
          
          <div className="flex items-center gap-4 text-white/50">
            <Volume2 size={18} />
            <div className="w-20 h-1 bg-white/10 rounded-full">
               <div className="w-2/3 h-full bg-white/40" />
            </div>
          </div>
        </div>
      </div>

      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default AudioPlayer;
