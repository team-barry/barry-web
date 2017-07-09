import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Container, Form, Button} from 'semantic-ui-react';
import * as authActions from 'redux/modules/auth';
import {Header} from 'components';
import styles from './Signup.css';

class Signup extends Component {
  static PropTypes = {
    user: PropTypes.object,
    signup: PropTypes.func
  }
  
  hundleSubmit = (event) => {
    event.preventDefault();
    const username = this.refs.username.value;
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const confirm = this.refs.confirm.value;
    if(password !== confirm) {
      console.log("password is diffrent to confirm!");
      return null;
    }
    const payload = {
      name: username,
      email: email,
      password: password
    }
    this.props.signup(payload);
  }
  
  render() {
    return (
      <div className="page">
        <Header />
        <Container>
          <div className="signup" style={styles}>
            <h1>サインアップ</h1>
            <Form>
              <Form.Field>
                <label>ユーザー名</label>
                <input
                  ref="username"
                  placeholder='Input User Name' />
              </Form.Field>
              <Form.Field>
                <label>Eメール</label>
                <input
                  ref="email"
                  type="email"
                  placeholder='Input Email Address' />
              </Form.Field>
              <Form.Field>
                <label>パスワード</label>
                <input
                  ref="password"
                  type="password"
                  placeholder='Input Password' />
              </Form.Field>
              <Form.Field>
                <label>確認</label>
                <input
                  ref="confirm"
                  type="password"
                  placeholder='Confirmation' />
              </Form.Field>
              <Button type='submit' onClick={this.hundleSubmit}>登録</Button>
            </Form>
          </div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    message: state.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(authActions, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup))
