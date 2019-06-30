export const toNumber = input => {
  const number = Number(input);
  return Number.isNaN(number) ? NaN : parseFloat(input);
};

export const toInteger = input => {
  const number = Number(input);
  return Number.isNaN(number) ? NaN : parseInt(input, 10);
};
