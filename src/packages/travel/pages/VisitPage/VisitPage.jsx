import React from 'react';
import { useAuthContext } from 'core/context/AuthContext';
import { useAddVisitPhotoRequest, useVisit } from 'travel/dataSource';
import VisitInfo from 'travel/components/VisitInfo';
import PhotosDropzone from './components/PhotosDropzone';
import PhotosGallery from 'modules/components/PhotosGallery';
import { usePaths } from 'modules/packages';

const domain = 'travel.VisitPage';
export default function VisitPage({
  match: {
    params: { userAlias, strVisitId },
  },
}) {
  const {
    isAuthenticated,
    userAlias: authenticatedUserAlias,
  } = useAuthContext();

  const { travel: travelPaths } = usePaths();

  const visitId = parseInt(strVisitId, 10);
  const { isError, isPending, visit, invalidate } = useVisit({
    domain,
    userAlias,
    visitId,
  });

  const { submitVisitPhoto } = useAddVisitPhotoRequest({
    domain,
    userAlias,
    visitId,
  });

  const isEditable = isAuthenticated && authenticatedUserAlias === userAlias;

  if (isError) {
    return <div>...Error</div>;
  }
  if (isPending) {
    return <div>...Loading</div>;
  }

  if (!visit) {
    return <div>...Не найдено посещение</div>;
  }

  const { photos, locationId } = visit;

  return (
    <>
      <VisitInfo
        visit={visit}
        isLong={true}
        locationUrl={travelPaths.location.toUrl({
          strLocationId: String(locationId),
          userAlias,
        })}
      />
      {isEditable && (
        <PhotosDropzone
          visit={visit}
          userAlias={userAlias}
          onUpload={values => submitVisitPhoto(values).finally(invalidate)}
        />
      )}
      <PhotosGallery photos={photos} />
    </>
  );
}
