import React from 'react';
import debounce from 'lodash/debounce';

const omit = (object, attrs) =>
  Object.entries(object).reduce((memo, [key, value]) => {
    if (!attrs.includes(key)) {
      memo[key] = value;
    }
    return memo;
  }, {});

export default ({
  request,
  requireProvision,
  resolveProvision,
  requirementsComparator,
  propsToOmit = [],
}) => WrappedComponent =>
  class extends React.Component {
    static displayName = `Provided(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'WrappedComponent'})`;

    constructor(props) {
      super(props);
      const { requirements: { debounceRequest } = {} } = this.props;
      if (debounceRequest) {
        this.require = debounce(this.require, debounceRequest);
      }
    }

    componentDidMount() {
      const { fulfilledRequirements, requirements } = this.props;
      if (!requirementsComparator(fulfilledRequirements, requirements)) {
        this.require();
      }
    }

    componentDidUpdate(prevProps) {
      const { requirements: prevRequirements } = prevProps;
      const { requirements: nextRequirements } = this.props;

      if (!requirementsComparator(prevRequirements, nextRequirements)) {
        this.require();
      }
    }

    require() {
      const { onRequest: handleRequest } = this.props;
      const response = requireProvision(this.props);

      if (handleRequest) {
        handleRequest(response);
      }
    }

    customRequest = requirements => request({ ...this.props, requirements });

    render() {
      const actualProps = propsToOmit
        ? omit(this.props, propsToOmit)
        : this.props;

      return (
        <WrappedComponent
          provision={resolveProvision(this.props)}
          request={this.customRequest}
          {...actualProps}
        />
      );
    }
  };
