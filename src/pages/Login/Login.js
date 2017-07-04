import React, {Component} from 'react';
import {Container, Form, Button} from 'semantic-ui-react';
import {Header} from 'components';
import styles from './Login.css';

export default class Login extends Component {
  render() {
    return (
      <div className="page">
        <Header />
        <Container>
          <div className="login" style={styles}>
            <h1>ログイン</h1>
            <Form>
              <Form.Field>
                <label>ユーザー名</label>
                <input placeholder='User Name' />
              </Form.Field>
              <Form.Field>
                <label>パスワード</label>
                <input placeholder='Password' />
              </Form.Field>
              <Button type='submit'>ログイン</Button>
            </Form>
          </div>
        </Container>
      </div>
    )
  }
}
