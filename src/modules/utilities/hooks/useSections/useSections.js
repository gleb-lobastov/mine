import { useEffect } from 'react';
import debounce from 'lodash/debounce';
import findNearestElement from './findNearestElement';

export default function useSections({ initialSection, onSectionChange }) {
  // execute only at mount
  useEffect(() => {
    const element = querySectionContainer(initialSection);
    const nearestElement = findNearestElement(queryAllSectionContainers());
    if (element && element !== nearestElement) {
      element.scrollIntoView(true);
    }
  }, []);

  useEffect(() => {
    let currentSection = initialSection;
    const handler = debounce(handleScroll, 1000);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);

    function handleScroll() {
      const nearestElement = findNearestElement(queryAllSectionContainers());
      if (!nearestElement) {
        return;
      }
      const nearestSection = sectionFromId(nearestElement.id);
      if (!nearestSection || nearestSection === currentSection) {
        return;
      }
      currentSection = nearestSection;
      onSectionChange(nearestSection);
    }
  }, []);
}

function querySectionContainer(section) {
  return window.document.querySelector(`#${idFromSection(section)}`);
}

function queryAllSectionContainers() {
  return window.document.querySelectorAll('[id^=section__]');
}

function sectionFromId(id) {
  return (/^section__([a-z]+)$/.exec(id) ?? [])[1];
}

export function idFromSection(section) {
  return `section__${section}`;
}
