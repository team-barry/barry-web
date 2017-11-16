import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Dropdown, Menu, Icon } from "semantic-ui-react";
import authActions from "redux/modules/auth/actions";
import trackingActions from "redux/modules/tracking/actions";
import UserEditModal from "modals/UserEditModal/UserEditModal";
import "./UserHeader.css";

class UserHeader extends Component {
  static PropTypes = {
    user: PropTypes.object,
    handleSignout: PropTypes.func,
    toggles: PropTypes.object.isRequried,
    visibles: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = {
      showUserEditModal: false,
    };
  }

  onOpenUserEditModal = () => {
    this.setState({
      ...this.state,
      showUserEditModal: true,
    });
  };

  onCloseUserEditModal = () => {
    this.setState({
      ...this.state,
      showUserEditModal: false,
    });
  };

  hundleSignout = event => {
    event.preventDefault();
    this.props.handleSignout();
  };

  iconColorWithToggleSidebar = () => {
    const visibleSidebar = this.props.visibles.sidebar;
    if (!visibleSidebar) {
      return "black";
    }
    return "blue";
  };

  iconColorWithToggleBows = () => {
    const visibleBows = this.props.visibles.bows;
    if (!visibleBows) {
      return "black";
    }
    return "blue";
  };

  render() {
    const { user, toggles } = this.props;
    return (
      <div>
        <Menu size="huge" compact={false} className="no-margin-bottom" style={{ margin: 0 }}>
          <Menu.Item onClick={toggles.sidebar}>
            <Icon name="content" size="large" color={this.iconColorWithToggleSidebar()} />
          </Menu.Item>
          <Menu.Item onClick={toggles.bows}>
            <Icon name="comment outline" size="large" color={this.iconColorWithToggleBows()} />
          </Menu.Item>
          <Menu.Menu position="right">
            <Dropdown text={user.screenName} pointing className="link item">
              <Dropdown.Menu>
                <Dropdown.Item onClick={this.onOpenUserEditModal}>
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
        <UserEditModal
          open={this.state.showUserEditModal}
          onOpen={this.onOpenUserEditModal}
          onClose={this.onCloseUserEditModal}
        />
      </div>
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
