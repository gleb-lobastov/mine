import React, { Fragment } from 'react';
import StatsPanel from '../../statistics/components/StatsPanel';
import VisitsPhotosGallery from '../VisitsPhotosGallery';
import VisitsLocationsMap from '../VisitsLocationsMap';

function VisitGroup({
  children,
  classes,
  config,
  forwardingProps,
  isObscure,
  showMap,
  showPhotos,
  provision,
  urls,
  visitsGroup,
  VisitsGroupComponent,
  onHeightChange,
}) {
  return (
    <Fragment key={visitsGroup.field.value}>
      <VisitsGroupComponent
        visitsGroup={visitsGroup}
        classes={classes}
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
      {showPhotos && (
        <VisitsPhotosGallery
          className={classes.nextLevel}
          visitsGroup={visitsGroup}
          provision={provision}
        />
      )}
      {showMap && (
        <VisitsLocationsMap
          className={classes.nextLevel}
          visitsGroup={visitsGroup}
          provision={provision}
          onToggle={onHeightChange}
        />
      )}
    </Fragment>
  );
}

export default React.memo(VisitGroup);
