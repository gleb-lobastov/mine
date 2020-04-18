/* eslint-disable import/prefer-default-export */
function spy(forwardingValue, description, ...args) {
  const consoleArgs = description
    ? [description, forwardingValue, ...args]
    : [forwardingValue, ...args];
  console.log(...consoleArgs);

  return forwardingValue;
}

export function registerDebugTools() {
  if (typeof window !== 'undefined') {
    window.c = spy;
  } else {
    global.c = spy;
  }
}
