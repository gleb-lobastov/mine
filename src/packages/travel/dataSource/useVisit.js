import { useSelector } from 'react-redux';
import { useProvision, useRequest, selectDict } from 'core/connection';

export default function useVisit({ userAlias, visitId: requiredVisitId }) {
  const { visitsDict } = useSelector(state => ({
    visitsDict: selectDict(state, 'visits') || {},
  }));
  const visit = visitsDict[requiredVisitId];

  return {
    visit,
    ...useProvision({
      domain: `travel.visit${requiredVisitId}-${userAlias}`,
      isProvision: true,
      modelName: 'visits',
      observe: requiredVisitId,
      condition: !visit,
      query: {
        userAlias,
        filter: { visit_id: { comparator: '=', value: requiredVisitId } },
        navigation: { isDisabled: true },
      },
    }),
  };
}

export function useAddVisitPhotoRequest({ domain }) {
  const [submitVisitPhoto, provision] = useRequest({
    domain,
    modelName: 'visits', // todo: actually this is assets model, not visits. Moreover this is photos model
    method: 'POST',
    contentType: 'multipart/form-data',
  });

  return {
    ...provision,
    submitVisitPhoto,
  };
}
