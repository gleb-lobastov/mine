export default function findNearestElement(elements) {
  if (!elements || !elements.length) {
    return null;
  }
  const elementsArray = Array.from(elements)
    .map(element => ({
      element,
      top: element.getBoundingClientRect().top,
    }))
    .sort(({ top: topA }, { top: topB }) => topA - topB);

  const startsInViewportIndex = elementsArray.findIndex(({ top }) => top >= 0);
  if (startsInViewportIndex < 0) {
    return elementsArray[elementsArray.length - 1].element;
  }

  const startsInViewport = elementsArray[startsInViewportIndex];
  if (startsInViewportIndex === 0) {
    return startsInViewport.element;
  }

  const { clientHeight } = window.document.documentElement;
  if (startsInViewport.top < clientHeight / 2) {
    return startsInViewport.element;
  }
  const endsInViewport = elementsArray[startsInViewportIndex - 1];
  return endsInViewport.element;
}
