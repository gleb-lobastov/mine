import React from 'react';
import memo from 'modules/memo';
import { provide } from 'core/request';

const mergeIfNeed = memo((provision, requirements) => {
  const { require } = requirements;
  if (require.length && provision.length) {
    return Object.assign(...provision);
  }
  return provision;
});

export default mapStateToRequirements => ExtendableComponent =>
  provide((state, props) => mapStateToRequirements(state, props))(
    ({ provision, requirements, isPending, ...props }) =>
      isPending ? (
        <div>Загрузка...</div>
      ) : (
        <ExtendableComponent
          contents={mergeIfNeed(provision, requirements)}
          {...props}
        />
      ),
  );
