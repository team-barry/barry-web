import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Message } from "semantic-ui-react";
import messageActions from "redux/modules/message/actions";
import i18n from "locales";
import "./MessageBar.css";

class MessageBar extends Component {
  static PropTypes = {
    isError: PropTypes.bool.isRequired,
    isShowing: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    hideMessage: PropTypes.func.isRequired,
  };

  handleDismiss = () => {
    this.props.hideMessage();
  };

  translate = message => {
    const attr = this.props.isError ? "ERRORS" : "NOTICES";
    const key = [attr, message].join(".");
    const translated = i18n.t(key);

    return translated;
  };

  render() {
    if (!this.props.isShowing) {
      return null;
    }
    let opts = {};
    if (this.props.isError) {
      opts = {
        negative: true,
      };
    } else {
      opts = {
        info: true,
      };
    }
    return (
      <Message {...opts} onDismiss={this.handleDismiss} className="message bar">
        <Message.Header>{this.translate(this.props.message)}</Message.Header>
      </Message>
    );
  }
}

const mapStateToProps = state => {
  return state.message;
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(messageActions, dispatch),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageBar));
