import { useEffect, useRef, useState } from 'react';

export default function App() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Match canvas resolution to screen size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Game state (keep mutable frame data outside React state)
    const player = { x: 100, y: 100, size: 40, speed: 4 };

    const update = () => {
      player.x += player.speed;
      if (player.x > canvas.width) player.x = -player.size;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#4ade80';
      ctx.fillRect(player.x, player.y, player.size, player.size);
    };

    const gameLoop = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    // Cleanup loop when component unmounts
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="game-container">
      <canvas ref={canvasRef} />
      <div className="ui-overlay">
        <h2>Score: {score}</h2>
      </div>
    </div>
  );
}
