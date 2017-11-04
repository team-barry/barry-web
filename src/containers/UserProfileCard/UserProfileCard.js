import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card } from "semantic-ui-react";
import { connect } from "react-redux";
import "./UserProfileCard.css";

class UserProfileCard extends Component {
  static PropTypes = {
    user: PropTypes.object.isRequried,
  };

  render() {
    const { user } = this.props;
    return (
      <Card>
        <Card.Content>
          <Card.Header>{user.screenName}</Card.Header>
          <Card.Description>{user.profile}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(UserProfileCard);
