/* eslint-disable import/prefer-default-export */
function spy(forwardingValue, description, ...args) {
  const consoleArgs = description
    ? [description, forwardingValue, ...args]
    : [forwardingValue, ...args];
  console.log(...consoleArgs);

  return forwardingValue;
}

function msg(forwardingValue, ...msgs) {
  console.log(...msgs);
  return forwardingValue;
}

export function registerDebugTools() {
  if (typeof window !== 'undefined') {
    window.c = spy;
    window.co = msg;
  } else {
    global.c = spy;
    global.co = msg;
  }
}
