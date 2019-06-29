// helper for react-sortable-hoc
export default event => {
  let element = event.target;
  while (element) {
    if (element.dataset && element.dataset.sortHandler === 'disabled') {
      return true;
    }
    element = element.parentNode;
  }
  return false;
};
