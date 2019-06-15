import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import { selectProvisionStatus } from 'core/connection';

const SHOW_DELAY = 200;
const HIDE_DELAY = 800;

class PendingRequestsIndicator extends React.PureComponent {
  static propTypes = {
    hasPendingRequest: PropTypes.bool,
  };

  static defaultProps = {
    hasPendingRequest: false,
  };

  constructor(props) {
    super(props);
    const { hasPendingRequest } = this.props;
    this.state = { isShown: hasPendingRequest };
  }

  componentDidUpdate(prevProps) {
    const { hasPendingRequest: wasPendingRequest } = prevProps;
    const { hasPendingRequest } = this.props;
    if (wasPendingRequest !== hasPendingRequest) {
      this.postponeState(
        { isShown: hasPendingRequest },
        hasPendingRequest ? SHOW_DELAY : HIDE_DELAY,
      );
    }
  }

  componentWillUnmount() {
    this.isUnmount = true;
  }

  postponeState(postponedState, delay) {
    setTimeout(() => {
      if (!this.isUnmount) {
        this.setState(postponedState);
      }
    }, delay);
  }

  render() {
    const { isShown } = this.state;
    if (!isShown) {
      return null;
    }
    return <LinearProgress />;
  }
}

const mapStateToProps = state => {
  const { isPending } = selectProvisionStatus(state, '');
  return { hasPendingRequest: isPending };
};
export default connect(mapStateToProps)(PendingRequestsIndicator);
