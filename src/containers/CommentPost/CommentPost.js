import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import bowActions from "redux/modules/bow/actions";
import { Card, Button, Form } from "semantic-ui-react";

class CommentPost extends Component {
  static PropTypes = {
    user: PropTypes.object.isRequired,
    current: PropTypes.object.isRequired,
    handleBow: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      comment: "",
    };
  }

  handleChange = (e, { value }) => {
    this.setState({
      ...this.state,
      comment: value,
    });
  };

  handleClick = e => {
    if (this.state.comment !== "") {
      this.props.handleBow({
        user: this.props.user,
        comment: this.state.comment,
        coordinate: this.props.current,
      });
    }
    this.setState({
      ...this.state,
      comment: "",
    });
  };

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>What's happen?</Card.Header>
        </Card.Content>
        <Card.Content>
          <Form>
            <Form.TextArea rows={5} value={this.state.comment} onChange={this.handleChange} autoHeight />
            <Button content="Bow!" icon="edit" labelPosition="left" onClick={this.handleClick} primary fluid />
          </Form>
        </Card.Content>
      </Card>
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
  return bindActionCreators(bowActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentPost);
