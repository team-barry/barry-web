import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import { formatDate } from "helpers/format";
import "./PopupComment.css";

export default class PopupComment extends Component {
  render() {
    const { bow } = this.props;
    const created_at = formatDate(bow.created_at);
    return (
      <Card.Group className="comment-popup">
        <Card>
          <Card.Content>
            <Card.Header>{bow.user.screenName}</Card.Header>
            <Card.Meta>{created_at}</Card.Meta>
            <Card.Description>{bow.comment}</Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}
