import { useEffect, useRef } from 'react';

interface BinaryRainProps {
  opacity?: number;
}

export default function BinaryRain({ opacity = 0.3 }: BinaryRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let drops: number[] = [];
    let mouseX = -1000;
    let mouseY = -1000;

    const fontSize = 14;
    let columns = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // Start at random negative positions
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      // Fade out effect
      ctx.fillStyle = `rgba(10, 10, 10, 0.1)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = Math.random() > 0.5 ? '1' : '0';
        
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Interactive scatter effect near mouse
        const dx = x - mouseX;
        const dy = y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let drawX = x;
        let drawY = y;
        
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - distance) * 0.1;
          drawX += Math.cos(angle) * force;
          drawY += Math.sin(angle) * force;
          
          ctx.fillStyle = char === '1' ? '#00f5ff' : '#00a3aa';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#00f5ff';
        } else {
          // Normal rendering
          if (char === '1') {
            ctx.fillStyle = `rgba(0, 245, 255, ${opacity})`;
            ctx.shadowBlur = 5;
            ctx.shadowColor = 'rgba(0, 245, 255, 0.5)';
          } else {
            ctx.fillStyle = `rgba(0, 245, 255, ${opacity * 0.4})`;
            ctx.shadowBlur = 0;
          }
        }

        ctx.fillText(char, drawX, drawY);

        // Reset shadow
        ctx.shadowBlur = 0;

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5; // Slow movement
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
