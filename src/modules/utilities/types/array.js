export const withItem = (array, item, index = array.length) => [
  ...array.slice(0, index),
  item,
  ...array.slice(index),
];

export const withoutItem = (array, index) => [
  ...array.slice(0, index),
  ...array.slice(index + 1),
];

export const replaceItem = (array, index, item) => [
  ...array.slice(0, index),
  item,
  ...array.slice(index + 1),
];
