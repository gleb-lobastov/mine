import checkIsPassiveEventsSupported from './checkIsPassiveEventsSupported';

function preventDefault(e) {
  e.preventDefault();
}

// https://stackoverflow.com/a/4770179
function preventDefaultForScrollKeys(event) {
  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  console.log({ key: event.keyCode });
  if ([37, 38, 39, 40].includes(event.keyCode)) {
    preventDefault(event);
    return false;
  }
  return undefined;
}

const wheelOpt = checkIsPassiveEventsSupported() ? { passive: false } : false;
const wheelEvent =
  'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

export function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

export function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
