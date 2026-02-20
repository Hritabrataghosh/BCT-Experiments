import React, { useEffect, useRef } from 'react';
import './Particles.css';

const Particles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);

    // Check if light mode
    const isLightMode = () => document.body.classList.contains('light-mode');

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        
        // Different colors for light vs dark mode
        if (isLightMode()) {
          // Brighter, more vibrant colors for light mode (teal to purple)
          this.color = `hsl(${Math.random() * 80 + 160}, 90%, 45%)`;
        } else {
          // Softer colors for dark mode (blue to purple)
          this.color = `hsl(${Math.random() * 60 + 240}, 70%, 60%)`;
        }
        
        this.life = 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.005;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life * (isLightMode() ? 0.6 : 0.8);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const particles = [];
    const maxParticles = isLightMode() ? 30 : 50; // Fewer particles in light mode

    const animate = () => {
      // Clear with appropriate background
      if (isLightMode()) {
        ctx.fillStyle = 'rgba(248, 250, 252, 0.3)'; // Light fade for light mode
      } else {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.1)'; // Dark fade for dark mode
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (particles.length < maxParticles && Math.random() < 0.1) {
        particles.push(new Particle());
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }

      // Connect particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            // Darker, more visible lines for light mode
            if (isLightMode()) {
              ctx.strokeStyle = `rgba(99, 102, 241, ${0.5 * (1 - distance / 150)})`;
              ctx.lineWidth = 2;
            } else {
              ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 150)})`;
              ctx.lineWidth = 1;
            }
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" />;
};

export default Particles;