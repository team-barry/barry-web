import React, {Component} from 'react';
import style from './User.css';
import {UserHeader, UserMap} from 'containers';
import {Sidebar, Menu} from 'semantic-ui-react'
import UserSidebar from 'containers/Sidebar/Sidebar';

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
          <Sidebar as={Menu} animation='overlay' visible={this.state.visible} width="wide" vertical>
            <UserSidebar />
          </Sidebar>
          <Sidebar.Pusher>
            <UserMap />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  };
}
