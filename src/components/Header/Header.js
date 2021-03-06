import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <Menu size="huge" compact={false}>
        <Menu.Item as={Link} to="/" name="Barry" />
      </Menu>
    );
  }
}
