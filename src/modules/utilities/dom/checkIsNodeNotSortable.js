// helper for react-sortable-hoc
export default event => {
  let element = event.target;
  while (element) {
    if (element.dataset && element.dataset.sortHandler === 'enabled') {
      return false;
    }
    element = element.parentNode;
  }
  return true;
};
