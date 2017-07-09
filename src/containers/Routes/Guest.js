import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter, Route, Redirect} from 'react-router';

class Guest extends Component {
  static PropTypes = {
    user: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  isAuthenticated(user) {
    // TODO Local Strage
    if(user.isLogin()) {
      return true;
    }
    return false;
  }
  
  render() {
    if(this.isAuthenticated(this.props.user)) {
      return (
        <Redirect to={{
          pathname: '/user',
          state: { from: this.props.location }
        }} />
      )
    } else {
      return (
        <Route {...this.props} />
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
}
export default withRouter(connect(mapStateToProps)(Guest));
