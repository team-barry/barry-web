import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Container, Form, Button} from 'semantic-ui-react';
import * as authActions from 'redux/modules/auth';
import {Header} from 'components';
import styles from './Login.css';

class Login extends Component {
  static PropTypes = {
    user: PropTypes.object,
    login: PropTypes.func
  };
  
  hundleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      email: this.refs.email.value,
      password: this.refs.password.value
    };
    this.props.login(payload);
  };
  
  render() {
    return (
      <div className="page">
        <Header />
        <Container>
          <div className="login" style={styles}>
            <h1>ログイン</h1>
            <Form>
              <Form.Field>
                <label>Eメール</label>
                <input
                  ref="email"
                  placeholder='Input Email Address' />
              </Form.Field>
              <Form.Field>
                <label>パスワード</label>
                <input
                  ref="password"
                  type="password"
                  placeholder='Input Password' />
              </Form.Field>
              <Button type='submit' onClick={this.hundleSubmit}>ログイン</Button>
            </Form>
          </div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(authActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
