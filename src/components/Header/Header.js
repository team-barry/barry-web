import React, {Component} from 'react';
import {Button, Menu, Container} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <Menu size="large" compact={true}>
        <Container>
          <Menu.Item as={Link} to="/" name='Barry' />
          
          <Menu.Menu position="right">
            <Menu.Item>
              <Button as={Link} to="/signup" color="orange">Sign Up</Button>
            </Menu.Item>
            <Menu.Item>
              <Button as={Link} to="/login">Log in</Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}
