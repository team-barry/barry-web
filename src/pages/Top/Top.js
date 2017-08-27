import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Header} from 'components';
import {Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import * as authActions from 'redux/modules/auth';
import style from './Top.css';
import firebase from 'firebase';

class Top extends Component {
  static PropTypes = {
    user: PropTypes.object,
    message: PropTypes.object,
    login: PropTypes.func
  };

  componentWillMount() {
    this.onChangeUser(this.props.user);
  }

  componentWillUpdate(nextProps) {
    if(this.props.user !== nextProps.user) {
      this.onChangeUser(nextProps.user);
      return true;
    }
    return false;
  }

  onClickStart = (event) => {
    // [TODO]
    // Add auth privider facebook
    const google = new firebase.auth.GoogleAuthProvider();
    const payload = {
      provider: google
    };
    this.props.login(payload);
  }

  onChangeUser = (user) => {
    if(user.isLogin()) {
      this.props.history.push('/user');
    }
  }

  render() {
    return (
      <div className="page" style={style}>
        <Header/>
        <section className="main">
          <h1 className="title">TRACK</h1>
          <h1 className="title">EVERYWHERE</h1>
        </section>
        <section className="footer">
          <Button onClick={this.onClickStart} color="orange" size="massive">
            START TRACK
          </Button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    message: state.auth.message
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Top);
