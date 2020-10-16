import React, { useLayoutEffect, useRef } from 'react';
import animateFlockingBoids from 'flocking-boids';

const useFlockGame = () => {
  const flockGameRef = useRef(null);
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const flockingBoids = animateFlockingBoids({ canvas });
    const {
      flockingBoids: { spawnPattern },
    } = flockingBoids.settings.characteristics;
    spawnPattern.maxGrowthPerTick = Infinity;
    spawnPattern.spotPattern = 'RANDOM';
    flockingBoids.play();
    flockGameRef.current = flockingBoids;
    return () => flockingBoids.pause();
  }, []);

  return { canvasRef, game: flockGameRef.current };
};

export default function FlockingBoids() {
  const { canvasRef } = useFlockGame();

  return (
    <canvas
      id="viewport"
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
      ref={canvasRef}
    />
  );
}
