import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route } from "react-router";
import authActions from "redux/modules/auth/actions";
import * as mapActions from "redux/modules/map";
import Loading from "pages/Loading/Loading";

class Private extends Component {
  static PropTypes = {
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    isUpdatingPosition: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    console.log("private component will mount");

    this.isAuthenticated();
    if (this.props.user.isLogin()) {
      this.startUpdatePosition(this.props);
    }
  }

  isAuthenticated() {
    return this.props.handleAuth();
  }

  startUpdatePosition(props) {
    if (!props.isUpdatingPosition) {
      props.setMapList(props.user);
      props.startUpdatePosition();
    }
  }

  render() {
    if (this.props.user.isLogging() || !this.props.ready) {
      return <Loading />;
    }
    return <Route {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isUpdatingPosition: state.map.isUpdating,
    ready: state.map.ready,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(mapActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Private);
