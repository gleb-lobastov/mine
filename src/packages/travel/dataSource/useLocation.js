import { useSelector } from 'react-redux';
import { useProvision, selectItem } from 'core/connection';

export default function useLocation({ domain, locationId }) {
  const location = useSelector(
    state => selectItem(state, 'locations', locationId) || {},
  );

  const provision = useProvision({
    domain,
    isProvision: true,
    modelName: 'locations',
    observe: locationId,
    condition: Boolean(locationId),
    query: {
      id: locationId,
    },
  });

  return {
    location,
    provision,
  };
}
