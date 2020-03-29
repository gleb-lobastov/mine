import isEqual from 'lodash/isEqual';

const observeIsChanged = (prevRequirements, nextRequirements) => {
  const { observe: prevObservable } = prevRequirements || {};
  const { observe: nextObservable } = nextRequirements || {};

  if (!prevRequirements && nextObservable === undefined) {
    return true;
  }
  return !isEqual(prevObservable, nextObservable);
};

const checkIsInvalidated = (prevProvision, nextProvision) => {
  if (!prevProvision) {
    return false;
  }
  const { isValid: prevIsValid = {} } = prevProvision || {};
  const { isValid: nextIsValid = {} } = nextProvision || {};
  return prevIsValid && !nextIsValid;
};

export default (
  { requirements: prevRequirements, provision: prevProvision },
  { requirements: nextRequirements, provision: nextProvision },
) =>
  checkIsInvalidated(prevProvision, nextProvision) ||
  observeIsChanged(prevRequirements, nextRequirements);
