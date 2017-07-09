import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter, Route, Redirect} from 'react-router';

class Private extends Component {
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
        <Route {...this.props} />
      )
    } else {
      return (
        <Redirect to={{
          pathname: '/login',
          state: { from: this.props.location }
        }} />
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
}
export default withRouter(connect(mapStateToProps)(Private));
