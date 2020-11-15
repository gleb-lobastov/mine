let supportsPassive;
function checkIsPassiveEventsSupported() {
  if (supportsPassive !== undefined) {
    return supportsPassive;
  }
  supportsPassive = false;
  try {
    window.addEventListener(
      'test',
      null,
      Object.defineProperty({}, 'passive', {
        // eslint-disable-next-line getter-return
        get() {
          supportsPassive = true;
        },
      }),
    );
    // eslint-disable-next-line no-empty
  } catch (e) {}
  return supportsPassive;
}

export default checkIsPassiveEventsSupported;
