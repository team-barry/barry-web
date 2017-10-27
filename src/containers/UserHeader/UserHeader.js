import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Dropdown, Menu, Icon } from "semantic-ui-react";
import authActions from "redux/modules/auth/actions";
import trackingActions from "redux/modules/tracking/actions";
import "./UserHeader.css";

class UserHeader extends Component {
  static PropTypes = {
    user: PropTypes.object,
    handleSignout: PropTypes.func,
    toggleVisibility: PropTypes.func.isRequried,
  };

  hundleSignout = event => {
    event.preventDefault();
    this.props.handleSignout();
    this.props.handleStopTracking();
  };

  render() {
    return (
      <Menu size="huge" compact={false} className="no-margin-bottom" style={{ margin: 0 }}>
        <Menu.Item onClick={this.props.toggleVisibility}>
          <Icon name="content" size="large" />
        </Menu.Item>
        <Menu.Menu position="right">
          <Dropdown text={this.props.user.name} pointing className="link item">
            <Dropdown.Menu>
              <Dropdown.Item>
                <Icon name="setting" />
                User Edit
              </Dropdown.Item>
              <Dropdown.Item onClick={this.hundleSignout}>
                <Icon name="sign out" />
                Sign out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(trackingActions, dispatch),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserHeader));
