import { useSelector } from 'react-redux';
import { useProvision, selectItem } from 'core/connection';

export default function useUser({ domain, userAlias }) {
  const user = useSelector(state => selectItem(state, 'users', userAlias));
  const provision = useProvision({
    domain,
    applicableSchemaName: 'item',
    isProvision: true,
    modelName: 'users',
    observe: userAlias,
    condition: Boolean(userAlias),
    query: {
      id: userAlias,
    },
  });
  return { ...provision, user };
}
