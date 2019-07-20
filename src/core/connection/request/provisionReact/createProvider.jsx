import React from 'react';
import debounce from 'lodash/debounce';

export default ({
  requirementsComparator: compareRequirements,
  transformProps = props => props,
  request,
}) => WrappedComponent => {
  let preservedRequirements; // keep observable between remounts

  return class extends React.Component {
    static displayName = `Provided(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'WrappedComponent'})`;

    constructor(props) {
      super(props);
      const { requirements: { debounceRequest } = {} } = this.props;
      if (debounceRequest) {
        this.request = debounce(this.request, debounceRequest);
      }
    }

    componentDidMount() {
      const { requirements } = this.props;
      const comparisonResult = compareRequirements(
        preservedRequirements,
        requirements,
      );
      if (comparisonResult) {
        this.request(comparisonResult);
      }
    }

    componentDidUpdate(prevProps) {
      const { requirements: prevRequirements } = prevProps;
      const { requirements: nextRequirements } = this.props;

      const comparisonResult = compareRequirements(
        prevRequirements,
        nextRequirements,
      );

      if (comparisonResult) {
        this.request(comparisonResult);
      }
    }

    request(comparisonResult) {
      const { requirements, onRequest: handleRequest } = this.props;
      preservedRequirements = requirements;

      const response = request({
        ...this.props,
        requirements: { ...requirements, comparisonResult },
      });

      if (handleRequest) {
        handleRequest(response);
      }
    }

    render() {
      return <WrappedComponent {...transformProps(this.props)} />;
    }
  };
};
