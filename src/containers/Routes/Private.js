import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter, Route} from 'react-router';
import * as authActions from 'redux/modules/auth';
import * as mapActions from 'redux/modules/map';
import Loading from 'pages/Loading/Loading';

class Private extends Component {
  static PropTypes = {
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    isUpdatingPosition: PropTypes.bool.isRequired
  };

  componentWillMount() {
    this.isAuthenticated(this.props);
    this.getCoordinates(this.props);
    this.startUpdatePosition(this.props);
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

  startUpdatePosition(props) {
    if(!props.isUpdatingPosition) {
      return props.startUpdatePosition();
    }
  }

  getCoordinates(props) {
    if(props.coordinates.size === 0) {
      return props.getCoordinates();
    }
  }

  render() {
    if(this.props.user.isLogging() || !this.props.viewport.hasLocation()) {
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
    user: state.auth.user,
    viewport: state.map.viewport,
    coordinates: state.map.coordinates,
    isUpdatingPosition: state.map.isUpdating
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(mapActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Private));
