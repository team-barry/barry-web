import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Form } from "semantic-ui-react";
import { DateFactory } from "helpers/date";

class CommentPost extends Component {
  constructor() {
    super();
    this.state = {
      comment: "",
    };
  }

  handleChange(e, { value }) {
    this.setState({
      ...this.state,
      comment: value,
    });
  }

  render() {
    return (
      <Form>
        <Form.TextArea rows={5} onChange={(e, hash) => this.handleChange(e, hash)} />
        <Button
          content="Bow!"
          labelPosition="left"
          icon="edit"
          onClick={() => {
            // Comment.push(this.props.user, this.state.comment, this.props.coordinates);
          }}
          primary
        />
      </Form>
    );
  }
}

const mapStateToProps = state => {
  const coordinates = state.tracking.trackedCoordinates;
  const current = coordinates.last();
  return {
    user: state.auth.user,
    current: current,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentPost);
