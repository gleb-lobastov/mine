import React from 'react';
import contents from 'Content/contents.json';

const getDisplayName = WrappedComponent => (
  WrappedComponent.displayName ||
  WrappedComponent.name ||
  'Component'
);

export default (ExtendableComponent) => {
  const HOC = props => <ExtendableComponent contents={contents} {...props} />;
  HOC.displayName = `withContent${getDisplayName(ExtendableComponent)})`;
  return HOC;
};
