import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter, Route} from 'react-router';
import * as authActions from 'redux/modules/auth';
import * as mapActions from 'redux/modules/map';
import Loading from 'pages/Loading/Loading';

class Guest extends Component {
  static PropTypes = {
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  
  componentWillMount() {
    this.isAuthenticated(this.props);
  }

  componentWillUpdate(nextProps) {
    this.isAuthenticated(nextProps);
  }

  isAuthenticated(props) {
    const user = props.user;
    if(user.needAuth()) {
      return this.props.authUser();
    }
    if(user.isLogging()) {
      return;
    }
    if(user.isLogin()) {
      props.history.replace('/user');
    }
  }

  render() {
    if(this.props.user.isLogging()) {
      return (
        <Loading />
      )
    }
    return (
      <Route {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(mapActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Guest));
