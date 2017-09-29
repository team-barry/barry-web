import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as authActions from 'redux/modules/auth';
import * as mapActions from 'redux/modules/map';

import {Button, Form} from 'semantic-ui-react'

import Comment from 'model/comment';
import {DateFactory} from 'helpers/date';

class CommentPostView extends Component {
  constructor() {
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
        <Button content='Add Comment' labelPosition='left' icon='edit' onClick={ () => {Comment.push(this.props.user, this.state.comment, this.props.coordinates)} } primary />
      </Form>
    )
  }
};

const mapStateToProps = (state) => {
  const {coordinates: currentCoordinates, selectedCoordinates, selectedDay} = state.map
  const isToday = DateFactory.today() === selectedDay;
  // 過去に行った場所にコメントできる必要はあるか微妙。UIに合わせた
  const coordinates = isToday ? currentCoordinates : selectedCoordinates
  return {
    user: state.auth.user,
    coordinates,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(mapActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentPostView);
