import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as authActions from 'redux/modules/auth';
import * as mapActions from 'redux/modules/map';

import {Button, Form} from 'semantic-ui-react'

class CommentPostView extends Component {
  render() {
    return (
      <Form reply>
        <Form.TextArea />
        <Button content='Add Comment' labelPosition='left' icon='edit' onClick={() => console.log("OK")} primary />
      </Form>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    selectedDay: state.map.selectedDay,
    usingDates: state.map.usingDates
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(mapActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentPostView);
