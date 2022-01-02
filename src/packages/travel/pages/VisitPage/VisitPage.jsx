import React from 'react';
import ConnectedLink from 'modules/components/muiExtended/ConnectedLink';
import { useAuthContext } from 'core/context/AuthContext';
import {
  useAddVisitPhotoRequest,
  useTripsStats,
  useVisit,
} from 'travel/dataSource';
import VisitsArranger, {
  PLAIN_FILTERING,
  PLAIN_GROUPS,
  PLAIN_SORTING,
} from 'travel/components/VisitsArranger';
import useVisitsUrls from 'travel/utils/useVisitsUrls';
import PhotosDropzone from './components/PhotosDropzone';

const domain = 'travel.VisitPage';
export default function VisitPage({
  match: {
    params: { userAlias, strVisitId, section },
  },
}) {
  const {
    isAuthenticated,
    userAlias: authenticatedUserAlias,
  } = useAuthContext();

  const visitId = parseInt(strVisitId, 10);
  const { isError, isPending, visit, invalidate } = useVisit({
    domain,
    userAlias,
    visitId,
  });
  const tripsStatsProvision = useTripsStats({
    domain,
    userAlias,
    tripsIds: visit?.tripId ? [visit.tripId] : [],
  });

  const { submitVisitPhoto } = useAddVisitPhotoRequest({
    domain,
    userAlias,
    visitId,
  });

  const editable = isAuthenticated && authenticatedUserAlias === userAlias;
  const urls = useVisitsUrls({ editable, userAlias, section });

  if (isError) {
    return <div>...Error</div>;
  }
  if (isPending) {
    return <div>...Loading</div>;
  }

  if (!visit) {
    return <div>...Не найдено посещение</div>;
  }

  return (
    <>
      <VisitsArranger
        visitsList={[visit]}
        provision={tripsStatsProvision}
        groupsOrder={[PLAIN_GROUPS.JUST_VISITS]}
        photosSectionLevel={0}
        mapSectionLevel={0}
        sortingOrder={[PLAIN_SORTING.LAST_VISIT]}
        filteringOption={PLAIN_FILTERING.ANY}
        isObscure={!editable}
        urls={urls}
        config={{ YearVisitsGroup: { hyperlinks: { year: false } } }}
      >
        {({ level, index, className }) =>
          level === 0 &&
          index === 0 && (
            <ConnectedLink
              className={className}
              variant="body2"
              to={urls.resolveTripUrl({ tripId: visit.tripId })}
            >
              вся поездка
            </ConnectedLink>
          )
        }
      </VisitsArranger>
      {editable && (
        <PhotosDropzone
          visit={visit}
          userAlias={userAlias}
          onChunkUpload={values => submitVisitPhoto(values)}
          onUploadComplete={invalidate}
        />
      )}
    </>
  );
}
