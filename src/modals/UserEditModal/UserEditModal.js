import React, { Component } from "react";
import { Button, Header, Icon, Modal, Form } from "semantic-ui-react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import authActions from "redux/modules/auth/actions";

class UserEditModal extends Component {
  static PropTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    onOpen: PropTypes.func.inRequired,
    onClose: PropTypes.func.isRequried,
    open: PropTypes.bool.isRequried,
    handleEditUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      screen_name: props.user.screenName,
      profile: props.user.profile,
    };
  }

  onClose = () => {
    this.props.onClose();
  };

  onSaveButtonClick = () => {
    const { user } = this.props;
    const { screen_name, profile } = this.state;
    const edited_user = {
      screen_name,
      profile,
    };
    this.props.handleEditUser({ user, edited_user });
    this.onClose();
  };

  onCancelButtonClick = () => {
    const { user } = this.props;
    this.setState({
      ...this.state,
      screen_name: user.screenName,
      profile: user.profile,
    });
    this.onClose();
  };

  onChangeScreenName = e => {
    this.setState({
      ...this.state,
      screen_name: e.target.value,
    });
  };

  onChangeProfile = e => {
    this.setState({
      ...this.state,
      profile: e.target.value,
    });
  };

  render() {
    const props = this.props;
    const { user } = props;
    const { screen_name, profile } = this.state;
    return (
      <Modal open={props.open} onOpen={props.onOpen} onClose={props.onClose} closeIcon>
        <Header icon="setting" content="User Edit" />
        <Modal.Content>
          <Form>
            <Form.Input label="Display Name" value={screen_name} onChange={this.onChangeScreenName} />
            <Form.Input label="Email" placeholder={user.email} disabled />
            <Form.TextArea
              label="Profile"
              placeholder="Tell us more about you..."
              value={profile || undefined}
              onChange={this.onChangeProfile}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={this.onCancelButtonClick}>
            <Icon name="remove" />Cancel
          </Button>
          <Button color="green" onClick={this.onSaveButtonClick}>
            <Icon name="checkmark" />Save
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditModal);
