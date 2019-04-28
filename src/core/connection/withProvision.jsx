import flattenIfNeeded from 'modules/utilities/request-kit/hocs/flattenIfNeeded';
import { withLoader } from 'modules/components/loaders/ProvisionLoader';
import { provide } from 'core/connection';

const compose = (...funcsArray) => arg =>
  funcsArray.reduceRight((composed, func) => func(composed), arg);

export default mapStateToRequirements => ExtendableComponent =>
  compose(
    provide(mapStateToRequirements),
    // flattenIfNeeded,
    withLoader,
  )(ExtendableComponent);
