import React, { Component } from "react";
import style from "./User.css";
import { UserHeader, UserMap, UserSidebar } from "containers";
import { Sidebar, Segment, Menu } from "semantic-ui-react";

export default class User extends Component {
  constructor() {
    super();
    this.state = {
      visibles: {
        sidebar: true,
        bows: true,
      },
    };
  }

  toggles = () => {
    return {
      sidebar: () => {
        this.setState({
          ...this.state,
          visibles: {
            ...this.state.visibles,
            sidebar: !this.state.visibles.sidebar,
          },
        });
      },
      bows: () => {
        this.setState({
          ...this.state,
          visibles: {
            ...this.state.visibles,
            bows: !this.state.visibles.bows,
          },
        });
      },
    };
  };

  render() {
    const { visibles } = this.state;
    return (
      <div className="page" style={style}>
        <UserHeader visibles={visibles} toggles={this.toggles()} />
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation="overlay" visible={visibles.sidebar} icon="labeled">
            <UserSidebar />
          </Sidebar>
          <Sidebar.Pusher className="main">
            <UserMap visibleBows={visibles.bows} />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
