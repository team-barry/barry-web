import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";
import "./PopupComment.css";

export default class PopupComment extends Component {
  render() {
    return (
      <Card.Group className="comment-popup">
        <Card>
          <Card.Content>
            <Card.Header>{this.props.name}</Card.Header>
            <Card.Description>{this.props.value}</Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}
