import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter, Route} from 'react-router';
import * as authActions from 'redux/modules/auth';

class Private extends Component {
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
    if(!user.isLogin()) {
      props.history.replace('/');
    }
  }
  
  render() {
    if(this.props.user.isLogging()) {
      return (
        <div>Loading...</div>
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
    ...bindActionCreators(authActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Private));
