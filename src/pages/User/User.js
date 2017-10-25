import React, { Component } from "react";
import style from "./User.css";
import { UserHeader, UserMap, UserSidebar } from "containers";
import { Sidebar, Segment, Menu } from "semantic-ui-react";

export default class User extends Component {
  constructor() {
    super();
    this.state = {
      visible: true,
    };
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    const { visible } = this.state;
    return (
      <div className="page" style={style}>
        <UserHeader toggleVisibility={this.toggleVisibility} />
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation="overlay" visible={visible} icon="labeled">
            <UserSidebar />
          </Sidebar>
          <Sidebar.Pusher className="main">
            <UserMap />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
