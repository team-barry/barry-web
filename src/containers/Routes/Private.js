import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route } from "react-router";
import authActions from "redux/modules/auth/actions";
import tackingActions from "redux/modules/tracking/actions";
import Loading from "pages/Loading/Loading";

class Private extends Component {
  static PropTypes = {
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    isTracking: PropTypes.object.isRequired,
    isReady: PropTypes.object.isRequired,
    handleStartTracking: PropTypes.func.isRequired,
  };

  componentWillMount() {
    console.log("private component will mount");

    this.isAuthenticated();
    if (this.props.user.isLogin()) {
      this.props.handleStartTracking({ user: this.props.user });
    }
  }

  isAuthenticated() {
    return this.props.handleAuth();
  }

  render() {
    if (this.props.user.isLogging() || !this.props.isReady) {
      return <Loading />;
    }
    return <Route {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isTracking: state.tracking.isTracking,
    isReady: state.tracking.isReady,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(tackingActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Private);
