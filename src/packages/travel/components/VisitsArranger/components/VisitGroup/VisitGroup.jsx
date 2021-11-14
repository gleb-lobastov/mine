import React, { Fragment } from 'react';
import StatsPanel from '../../statistics/components/StatsPanel';
import VisitsPhotosGallery from '../VisitsPhotosGallery';
import VisitsLocationsMap from '../VisitsLocationsMap';
import cls from 'classnames';

export default function VisitGroup({
  children,
  classes,
  config,
  forwardingProps,
  isObscure,
  mapSectionLevel,
  nestingLevel,
  photosSectionLevel,
  provision,
  sectionLevel,
  urls,
  visitsGroup,
  VisitsGroupComponent,
  onHeightChange
}) {
  return (
    <Fragment key={visitsGroup.field.value}>
      <VisitsGroupComponent
        visitsGroup={visitsGroup}
        classes={resolveVisitsGroupClasses(classes, {
          nestingLevel,
          sectionLevel,
        })}
        provision={provision}
        urls={urls}
        config={config}
        {...forwardingProps}
      >
        <StatsPanel
          visitsGroup={visitsGroup}
          provision={provision}
          isObscure={isObscure}
          config={config}
        />
      </VisitsGroupComponent>
      {children}
      {sectionLevel === photosSectionLevel && (
        <VisitsPhotosGallery
          className={classes[`level${nestingLevel + 1}`]}
          visitsGroup={visitsGroup}
          provision={provision}
        />
      )}
      {sectionLevel === mapSectionLevel && (
        <VisitsLocationsMap
          className={classes[`level${nestingLevel + 1}`]}
          visitsGroup={visitsGroup}
          provision={provision}
          onToggle={onHeightChange}
        />
      )}
    </Fragment>
  );
}

function resolveVisitsGroupClasses(classes, { nestingLevel, sectionLevel }) {
  return {
    level: classes[`level${nestingLevel}`],
    container: cls(
      classes[`level${nestingLevel}`],
      classes[`container${sectionLevel}`],
    ),
    header: classes[`header${sectionLevel}`],
  };
}
