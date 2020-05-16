import { useState, useEffect } from 'react';

export default function makeFlagWithInertia({
  setupDelay,
  teardownDelay = setupDelay,
}) {
  return function useFlagWithInertia(flag) {
    const [flagWithInertia, setFlagWithInertia] = useState(flag);
    useEffect(
      () => {
        const isSetup = Boolean(flag);
        const timeoutId = setTimeout(() => {
          if (flagWithInertia !== flag) {
            setFlagWithInertia(flag);
          }
        }, isSetup ? setupDelay : teardownDelay);
        return () => clearTimeout(timeoutId);
      },
      [flag],
    );
    return flagWithInertia;
  };
}
