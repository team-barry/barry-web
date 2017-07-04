import React, {Component} from 'react';
import {Container, Form, Button} from 'semantic-ui-react';
import {Header} from 'components';
import styles from './Signup.css';

export default class Signup extends Component {
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
                <input placeholder='User Name' />
              </Form.Field>
              <Form.Field>
                <label>パスワード</label>
                <input placeholder='Password' />
              </Form.Field>
              <Form.Field>
                <label>確認</label>
                <input placeholder='Confirmation' />
              </Form.Field>
              <Button type='submit'>登録</Button>
            </Form>
          </div>
        </Container>
      </div>
    )
  }
}
