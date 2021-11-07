import React from 'react';
import { useAuthContext } from 'core/context/AuthContext';
import { useAddVisitPhotoRequest, useVisit } from 'travel/dataSource';
import VisitInfo from 'travel/components/VisitInfo';
import PhotosDropzone from './components/PhotosDropzone';
import PhotosGallery from 'modules/components/PhotosGallery';

const domain = 'travel.VisitEditPage';
export default function VisitEditPage({
  match: {
    params: { userAlias, strVisitId },
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

  const { photos } = visit;

  const contentNode = <VisitInfo visit={visit} isLong={true} />;

  return (
    <>
      {isEditable ? (
        <PhotosDropzone
          visit={visit}
          userAlias={userAlias}
          onUpload={values => submitVisitPhoto(values).finally(invalidate)}
        >
          {contentNode}
        </PhotosDropzone>
      ) : (
        contentNode
      )}
      <PhotosGallery photos={photos} />
    </>
  );
}
