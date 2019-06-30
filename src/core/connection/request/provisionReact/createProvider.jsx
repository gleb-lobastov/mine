import React from 'react';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';

const omit = (object, attrs) =>
  Object.entries(object).reduce((memo, [key, value]) => {
    if (!attrs.includes(key)) {
      memo[key] = value;
    }
    return memo;
  }, {});

const checkIsIdentityEqual = isEqual;

export default ({
  request,
  requireProvision,
  resolveProvision,
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
      const {
        prevIdentity,
        requirements: { identity },
      } = this.props;
      if (
        !checkIsIdentityEqual(prevIdentity, identity) ||
        (typeof prevIdentity === 'undefined' && typeof identity === 'undefined')
      ) {
        this.require();
      }
    }

    componentDidUpdate(prevProps) {
      const {
        requirements: { identity: prevIdentity },
      } = prevProps;
      const {
        requirements: { identity: nextIdentity },
      } = this.props;

      if (!checkIsIdentityEqual(prevIdentity, nextIdentity)) {
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
