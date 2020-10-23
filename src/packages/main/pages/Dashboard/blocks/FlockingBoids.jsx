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

    flockGameRef.current =
      flockGameRef.current || animateFlockingBoids({ canvas });

    const animation = flockGameRef.current;
    setup(animation);
    animation.play();

    return () => animation.pause();
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

function setup({
  settings: {
    characteristics: {
      flockingBoids,
      flockingBoids: { spawnPattern },
    },
  },
}) {
  /* eslint-disable no-param-reassign */
  spawnPattern.maxGrowthPerTick = Infinity;
  flockingBoids.count = 400;
  /* eslint-enable no-param-reassign */
}
