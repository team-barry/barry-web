import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import authActions from "redux/modules/auth/actions";
import { withRouter, Route } from "react-router";
import Loading from "pages/Loading/Loading";

class Private extends Component {
  static PropTypes = {
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    isTracking: PropTypes.object.isRequired,
    isReady: PropTypes.object.isRequired,
    handleLogin: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.authenticate(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.backIfUserNoLogin(nextProps);
  }

  authenticate = props => {
    const { auth } = props;
    if (!auth.logged_in) {
      this.props.handleLogin();
    }
  };

  backIfUserNoLogin = props => {
    const { auth } = props;
    if (!auth.logging_in && !auth.logged_in) {
      props.history.replace("/");
    }
  };

  render() {
    const { auth, isReady } = this.props;
    if (!auth.logged_in || !isReady) {
      return <Loading />;
    }
    return <Route {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    isTracking: state.tracking.isTracking,
    isReady: state.tracking.isReady,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Private));
