import { renderHook, act } from '@testing-library/react-hooks';
import makeFlagWithInertia from '../makeFlagWithInertia';

jest.useFakeTimers();

const SHORT_DELAY = 200;
const LONG_DELAY = 800;

describe('useFlagWithInertia', () => {
  describe('initial flagWithInertia value', () => {
    iterateOverTrueAndFalse(originalFlag =>
      it(`should initialize flagWithInertia as ${originalFlag} if original flag is ${originalFlag}`, () => {
        const useFlagWithInertia = makeFlagWithInertia({
          setupDelay: SHORT_DELAY,
        });
        const { result } = renderHook(() => useFlagWithInertia(originalFlag));
        const flagWithInertia = result.current;
        expect(flagWithInertia).toBe(originalFlag);
      }),
    );
  });

  describe('prevention of immediate changes', () => {
    iterateOverTrueAndFalse(originalFlag =>
      it(`should not immediately change flagWithInertia to ${!originalFlag}, if flag is updated from ${originalFlag} to ${!originalFlag}`, () => {
        const useFlagWithInertia = makeFlagWithInertia({
          setupDelay: SHORT_DELAY,
        });
        const { result, rerender } = renderHook(
          ({ flag }) => useFlagWithInertia(flag),
          { initialProps: { flag: originalFlag } },
        );
        rerender({ flag: !originalFlag });
        const flagWithInertia = result.current;
        expect(flagWithInertia).toBe(originalFlag);
      }),
    );
  });

  describe('delayed changes', () => {
    iterateOverTrueAndFalse(originalFlag => {
      it(`should change flagWithInertia to ${!originalFlag} after delay, if flag is updated from ${originalFlag} to ${!originalFlag}`, () => {
        const useFlagWithInertia = makeFlagWithInertia({
          setupDelay: SHORT_DELAY,
        });
        const { result, rerender } = renderHook(
          ({ flag }) => useFlagWithInertia(flag),
          { initialProps: { flag: originalFlag } },
        );

        act(() => {
          rerender({ flag: !originalFlag });
          jest.advanceTimersByTime(SHORT_DELAY + 1);
        });

        const flagWithInertia = result.current;
        expect(flagWithInertia).toBe(!originalFlag);
      });
    });
  });

  describe('setup and teardown delay', () => {
    iterateOverTrueAndFalse(originalFlag => {
      const propose = originalFlag
        ? 'should only change flagWithInertia to true after setup delay, but not after just teardown delay, if flag is updated from true to false'
        : 'should only change flagWithInertia to false after teardown delay, but not after just setup delay, if flag is updated from false to true';

      it(propose, () => {
        const isSetup = !originalFlag;
        const useFlagWithInertia = makeFlagWithInertia({
          setupDelay: isSetup ? LONG_DELAY : SHORT_DELAY,
          teardownDelay: isSetup ? SHORT_DELAY : LONG_DELAY,
        });

        const { result, rerender } = renderHook(
          ({ flag }) => useFlagWithInertia(flag),
          { initialProps: { flag: originalFlag } },
        );

        act(() => {
          rerender({ flag: !originalFlag });
          jest.advanceTimersByTime(SHORT_DELAY + 1);
        });

        expect(result.current).toBe(originalFlag);

        act(() => {
          jest.advanceTimersByTime(LONG_DELAY - SHORT_DELAY);
        });

        expect(result.current).toBe(!originalFlag);
      });
    });
  });

  describe('ignore twitch', () => {
    iterateOverTrueAndFalse(originalFlag => {
      it(`should not change flagWithInertia, if flag is updated from ${originalFlag} to ${!originalFlag} and then back to ${originalFlag} in time, less than delay`, () => {
        const useFlagWithInertia = makeFlagWithInertia({
          setupDelay: SHORT_DELAY,
        });
        const { result, rerender } = renderHook(
          ({ flag }) => useFlagWithInertia(flag),
          { initialProps: { flag: originalFlag } },
        );

        act(() => {
          rerender({ flag: !originalFlag });
          jest.advanceTimersByTime(SHORT_DELAY / 2);
        });

        act(() => {
          rerender({ flag: originalFlag });
          jest.advanceTimersByTime(SHORT_DELAY / 2 + 1);
        });

        expect(result.current).toBe(originalFlag);
      });
    });
  });
});

function iterateOverTrueAndFalse(callback) {
  [true, false].forEach(callback);
}
