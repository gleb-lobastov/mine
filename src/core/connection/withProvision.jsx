import { withLoader } from 'modules/components/loaders/ProvisionLoader';
import { provide } from 'core/connection';

const compose = (...funcsArray) => arg =>
  funcsArray.reduceRight((composed, func) => func(composed), arg);

export default (...provisionParams) => ExtendableComponent =>
  compose(
    provide(...provisionParams),
    withLoader,
  )(ExtendableComponent);
