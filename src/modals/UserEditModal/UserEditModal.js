import React, { Component } from "react";
import { Button, Header, Icon, Modal, Form } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class UserEditModal extends Component {
  static PropTypes = {
    user: PropTypes.object.isRequired,
    onOpen: PropTypes.func.inRequired,
    onClose: PropTypes.func.isRequried,
    open: PropTypes.bool.isRequried,
  };

  onClose = () => {
    this.props.onClose();
  };

  onSaveButtonClick = () => {
    this.onClose();
  };

  onCancelButtonClick = () => {
    this.onClose();
  };

  render() {
    const props = this.props;
    const { user } = props;
    return (
      <Modal open={props.open} onOpen={props.onOpen} onClose={props.onClose} closeIcon>
        <Header icon="setting" content="User Edit" />
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Input label="Display Name" placeholder={user.name} />
              <Form.Input label="Email" placeholder={user.email} disabled />
            </Form.Group>
            <Form.TextArea label="Profile" placeholder="Tell us more about you..." />
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
    user: state.auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditModal);
