const setSelectorRoot = (wrappedSelector, selectorRoot) => (state, ...args) => {
  let forwardedState;
  if (typeof selectorRoot === 'function') {
    forwardedState = selectorRoot(state);
  } else if (selectorRoot) {
    forwardedState = state[selectorRoot];
  } else {
    forwardedState = state;
  }
  return wrappedSelector(forwardedState, ...args);
};

export default function(selector, selectorRoot) {
  const adoptedSelector = setSelectorRoot(selector, selectorRoot);
  adoptedSelector.bindModel = modelName => (state, ...args) =>
    adoptedSelector(state, modelName, ...args);
  return adoptedSelector;
}
