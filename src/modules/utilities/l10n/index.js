/* eslint-disable import/prefer-default-export */
export function plural(amount, { many, few = many, one }) {
  let value = Math.abs(amount);
  value %= 100;
  if (value >= 5 && value <= 20) {
    return many;
  }
  value %= 10;
  if (value === 1) {
    return one;
  }
  if (value >= 2 && value <= 4) {
    return few;
  }
  return many;
}
