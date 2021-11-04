import React from 'react';
import PhotosGallery from 'modules/components/PhotosGallery';

export default function VisitsPhotosGallery({ className, visitsGroup }) {
  const visitPhotos = visitsGroup.visitsList.flatMap(({ photos }) => photos);

  return (
    <PhotosGallery
      className={className}
      photos={visitPhotos}
      galleryKey={resolveUniqKey(visitsGroup)}
    />
  );
}

function resolveUniqKey(visitsGroup) {
  let currentVisitsGroup = visitsGroup;
  let uniqKey = '';
  while (currentVisitsGroup) {
    const { field } = currentVisitsGroup;
    uniqKey += field ? `${field.name}:${field.value};` : '*;';
    currentVisitsGroup = currentVisitsGroup.parent;
  }
  return uniqKey;
}
