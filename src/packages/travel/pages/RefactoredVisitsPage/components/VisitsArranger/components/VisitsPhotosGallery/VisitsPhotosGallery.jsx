import React from 'react';
import PhotosGallery from 'modules/components/PhotosGallery';

export default function VisitsPhotosGallery({ className, visitsList }) {
  const visitPhotos = visitsList.flatMap(({ photos }) => photos);

  return <PhotosGallery className={className} photos={visitPhotos} />;
}
