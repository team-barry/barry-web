import React, {Component} from 'react';
import style from './User.css';
import {UserHeader, UserMap} from 'containers';
import {Sidebar, Menu, Icon} from 'semantic-ui-react'


export default class User extends Component {
  constructor() {
    super();
    this.state = {
      visible: false
    };
  };
  
  toggleHeaderVisible = (event) => {
    event.preventDefault();
    this.setState({visible: !this.state.visible});
  };
  
  render() {
    return (
      <div className="page" style={style}>
        <UserHeader parentFunc={this.toggleHeaderVisible}/>
        <Sidebar.Pushable className="main">
          <Sidebar as={Menu} animation='overlay' direction='left' visible={this.state.visible} icon='labeled' width="wide" vertical>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <UserMap />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  };
}
