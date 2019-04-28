import React from 'react';

const omit = (object, attrs) => {
  return Object.entries(object).reduce((result, [key, value]) => {
    if (!attrs.includes(key)) {
      result[key] = value;
    }
    return result;
  }, {});
};

export default ({
  requireProvision,
  resolveProvision,
  requirementsComparator,
  propsToOmit = [],
}) => WrappedComponent =>
  class extends React.Component {
    static displayName = `Provided(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'WrappedComponent'})`;

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

    render() {
      const actualProps = propsToOmit
        ? omit(this.props, propsToOmit)
        : this.props;

      return (
        <WrappedComponent
          provision={resolveProvision(this.props)}
          {...actualProps}
        />
      );
    }
  };
