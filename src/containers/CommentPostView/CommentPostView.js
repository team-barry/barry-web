import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as authActions from 'redux/modules/auth';
import * as mapActions from 'redux/modules/map';

import {Button, Form} from 'semantic-ui-react'

import Comment from 'model/comment';

class CommentPostView extends Component {
  constructor() {
    console.log("called")
    super()
    this.state = {
      comment: ""
    }
  }
  handleChange(e, { value }) {
    this.setState({
      ...this.state,
      comment: value,
    })
  }
  render() {
    return (
      <Form reply>
        <Form.TextArea onChange={(e, hash) => this.handleChange(e, hash)}/>
        <Button content='Add Comment' labelPosition='left' icon='edit' onClick={ () => {console.log(this.state); Comment.push(this.props.user, this.state.comment)} } primary />
      </Form>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(mapActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentPostView);
