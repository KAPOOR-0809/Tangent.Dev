'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from '../globals.css';

// A utility function to convert HSL to HEX color values.
const hslToHex = (h, s, l) => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};


const ColorPickerAnimato = ({ onColorSelect }) => {
  const canvasRef = useRef(null);
  // Default to a pleasant blue color
  const [selectedColor, setSelectedColor] = useState({ h: 200, s: 85, l: 55 });
  const [lightness, setLightness] = useState(55);
  const [copied, setCopied] = useState(false);

  // Using refs for animation state to prevent re-renders on every frame.
  const mousePosRef = useRef({ x: -1, y: -1 });
  const animationFrameId = useRef();

  // Effect to handle the canvas drawing and animation loop.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Adjust for high-density "Retina" screens
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    let frameCount = 0;

    const animate = () => {
      frameCount++;
      drawWave(ctx, frameCount);
      drawHoverParticle(ctx);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    const drawWave = (ctx, frame) => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, width, height);

      // We draw in blocks for better performance
      for (let y = 0; y < height; y += 4) {
        for (let x = 0; x < width; x += 4) {
          const hue = (x / width) * 360;
          const saturation = (y / height) * 100;
          
          // A sine wave calculation to make the colors "flow"
          const waveOffset = Math.sin((x + frame * 1.5) * 0.02) * 10 + Math.sin((y + frame * 1.5) * 0.03) * 10;
          const currentLightness = lightness + waveOffset;

          ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${currentLightness}%)`;
          ctx.fillRect(x, y, 4, 4);
        }
      }
    };

    const drawHoverParticle = (ctx) => {
        if (mousePosRef.current.x < 0) return;

        const { x, y } = mousePosRef.current;
        const radius = 15; // Radius of the particle circle
        
        // This makes the particles orbit the cursor
        for (let i = 0; i < 5; i++) {
            const angle = (performance.now() / 150) + (i * Math.PI * 2 / 5);
            const pX = x + Math.cos(angle) * radius;
            const pY = y + Math.sin(angle) * radius;
            
            // Determine color from hover position
            const hue = (x / canvas.offsetWidth) * 360;
            const saturation = (y / canvas.offsetHeight) * 100;

            ctx.beginPath();
            ctx.arc(pX, pY, 2, 0, Math.PI * 2); // Draw a small circle
            ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
            ctx.shadowBlur = 8;
            ctx.fill();
        }
        ctx.shadowBlur = 0; // Reset shadow for performance
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [lightness]); // Re-run effect only when lightness changes

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    mousePosRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const handleMouseLeave = () => {
    // Reset mouse position when it leaves the canvas
    mousePosRef.current = { x: -1, y: -1 };
  };

  const handleClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const hue = Math.round((x / canvas.offsetWidth) * 360);
    const saturation = Math.round((y / canvas.offsetHeight) * 100);

    const newColor = { h: hue, s: saturation, l: lightness };
    setSelectedColor(newColor);
    // Propagate the selected color to the parent component
    if (onColorSelect) {
      onColorSelect(hslToHex(hue, saturation, lightness));
    }
  };

  const handleLightnessChange = (event) => {
    const newLightness = parseInt(event.target.value, 10);
    setLightness(newLightness);

    // Update the selected color with the new lightness value
    const newColor = { ...selectedColor, l: newLightness };
    setSelectedColor(newColor);
    if (onColorSelect) {
        onColorSelect(hslToHex(newColor.h, newColor.s, newColor.l));
    }
  };

  const copyToClipboard = () => {
    const hex = hslToHex(selectedColor.h, selectedColor.s, selectedColor.l);
    navigator.clipboard.writeText(hex);
    setCopied(true);
    // Reset the "Copied!" text after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedHex = hslToHex(selectedColor.h, selectedColor.s, selectedColor.l);

  return (
    <div className={styles.pickerContainer}>
      <div className={styles.canvasWrapper}>
        <canvas
          ref={canvasRef}
          className={styles.colorCanvas}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        />
      </div>
      <div className={styles.controls}>
        <div className={styles.sliderContainer}>
          <span className={styles.sliderLabel}>Lightness</span>
          <input
            type="range"
            min="0"
            max="100"
            value={lightness}
            onChange={handleLightnessChange}
            className={styles.slider}
            style={{ '--thumb-color': selectedHex }}
          />
        </div>
        <div className={styles.colorDisplay}>
          <div
            className={styles.colorSwatch}
            style={{ backgroundColor: selectedHex }}
          />
          <div className={styles.colorValues}>
            <span className={styles.hexValue}>{selectedHex}</span>
            <span className={styles.hslValue}>
              {`hsl(${selectedColor.h}, ${selectedColor.s}%, ${selectedColor.l}%)`}
            </span>
          </div>
          <button onClick={copyToClipboard} className={styles.copyButton}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorPickerAnimato;