import { useEffect, useRef } from 'react';
import throttle from 'lodash/throttle';
import findNearestElement from './findNearestElement';

const SECTION_UPDATE_DELAY = 125;
const ENSURE_SCROLL_DELAY = 500; // Should be greater than material ui scroll animation time

export default function useSections({ section, onSectionChange }) {
  const currentSectionRef = useRef(null);
  const awaitSectionRef = useRef(null);

  useEffect(
    () => {
      if (section === currentSectionRef.current) {
        return;
      }
      const element = querySectionContainer(section);
      const nearestElement = findNearestElement(queryAllSectionContainers());

      const isFirstRender = !currentSectionRef.current;
      if (element && element !== nearestElement) {
        awaitSectionRef.current = section;
        element.scrollIntoView({
          block: 'start',
          // ignore smooth scroll on page init
          behavior: !isFirstRender ? 'smooth' : 'auto',
        });
        setTimeout(() => {
          // There is a bug: when material-ui tabs in toolbar has simultaneous animation,
          // it completely prevents scrollIntoView from action.
          // This workaround wait for time > any animation time and check,
          // if scrollIntoView isn't worked as expected and element still not in view.
          // If so, then try again, but without smooth behavior, as it more robust way
          if (awaitSectionRef.current) {
            awaitSectionRef.current = null;
            element.scrollIntoView({ block: 'start' });
          }
        }, ENSURE_SCROLL_DELAY);
      }
      if (isFirstRender) {
        currentSectionRef.current = section; // first render is over
      }
    },
    [section],
  );

  useEffect(() => {
    const handler = throttle(handleScroll, SECTION_UPDATE_DELAY);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);

    function handleScroll() {
      const nearestElement = findNearestElement(queryAllSectionContainers());
      if (!nearestElement) {
        return;
      }
      const nearestSection = sectionFromId(nearestElement.id);
      if (!nearestSection || nearestSection === currentSectionRef.current) {
        return;
      }
      currentSectionRef.current = nearestSection;

      // used to prevent onSectionChange during smoothScroll caused by
      // external section change
      if (awaitSectionRef.current) {
        if (awaitSectionRef.current !== currentSectionRef.current) {
          return;
        }
        awaitSectionRef.current = null;
      }
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
