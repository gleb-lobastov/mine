import { useState, useEffect, useRef } from 'react';

export default markersData => {
  const [googleMapsApi, setGoogleMapsApi] = useState(null);

  const isFirsRenderRef = useRef(true);

  useEffect(
    () => {
      if (!googleMapsApi) {
        return undefined;
      }
      const { map, maps } = googleMapsApi;
      const bounds = new maps.LatLngBounds();
      const markers = markersData.map(
        ({ lat, lon, iconUrl, title, zIndex }) => {
          const marker = new maps.Marker({
            map,
            position: { lat, lng: lon },
            icon: {
              url: iconUrl,
              scaledSize: new maps.Size(24, 24),
            },
            scale: 0.5,
            title,
            zIndex,
          });
          bounds.extend(marker.position);
          return marker;
        },
      );
      if (isFirsRenderRef.current) {
        map.setOptions({ maxZoom: 11, minZoom: 2 });
        map.fitBounds(bounds);
        map.setOptions({ maxZoom: null, minZoom: null });
        isFirsRenderRef.current = false;
      }
      return () => {
        markers.forEach(marker => {
          marker.setMap(null);
          marker.setVisible(false);
        });
        markers.length = 0;
      };
    },
    [googleMapsApi, markersData],
  );
  return { handleGoogleApiLoaded: api => setGoogleMapsApi(api) };
};
