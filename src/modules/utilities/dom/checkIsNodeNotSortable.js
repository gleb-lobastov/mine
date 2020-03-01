// helper for react-sortable-hoc
export default event => {
  let element = event.target;
  while (element) {
    const { dataset } = element;

    if (dataset) {
      const { sortHandler } = dataset;
      if (sortHandler === 'enabled') {
        return false;
      }
      if (sortHandler === 'disabled') {
        return true;
      }
    }

    element = element.parentNode;
  }
  return true;
};
