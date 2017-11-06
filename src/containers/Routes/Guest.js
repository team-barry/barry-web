import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Route } from "react-router";
import authActions from "redux/modules/auth/actions";
import Loading from "pages/Loading/Loading";

class Guest extends Component {
  static PropTypes = {
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.isAuthenticated(this.props);
  }

  componentWillUpdate(nextProps) {
    this.isAuthenticated(nextProps);
  }

  isAuthenticated(props) {
    const { auth } = props;
    if (auth.logging_in) {
      return;
    }
    if (auth.logged_in) {
      props.history.replace("/user");
    }
  }

  render() {
    const { auth } = this.props;
    if (auth.logging_in) {
      return <Loading />;
    }
    return <Route {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Guest));
