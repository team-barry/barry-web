import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import emptyImageUrl from "assets/empty.png";
import "./UserProfileCard.css";

class UserProfileCard extends Component {
  static PropTypes = {
    user: PropTypes.object.isRequried,
  };

  imagePreview = () => {
    const { user } = this.props;
    if (user.icon_url) {
      return user.icon_url;
    }
    return emptyImageUrl;
  };

  trackingState = () => {
    if (this.props.isTracking) {
      return "Tracking Now";
    } else {
      return "Stop traking. Please refresh page.";
    }
  };

  render() {
    const { user } = this.props;
    return (
      <Card className="profile-card">
        <Card.Content>
          <Image floated="right" size="mini" src={this.imagePreview()} />
          <Card.Header>{user.screenName}</Card.Header>
          <Card.Meta>{this.trackingState()}</Card.Meta>
          <Card.Description>{user.profile}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isTracking: state.tracking.isTracking,
  };
};

export default connect(mapStateToProps)(UserProfileCard);
