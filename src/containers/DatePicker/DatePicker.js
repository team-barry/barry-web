import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as authActions from 'redux/modules/auth';
import * as mapActions from 'redux/modules/map';
import {Card, Feed} from 'semantic-ui-react'
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css'

class MyDatePicker extends Component {
  constructor() {
    super();
    this.state = {
      startDate: moment()
    };
  };

  static PropTypes = {
    user: PropTypes.object,
    coordinates: PropTypes.object
  };

  handleChange = (date) => {
    this.setState({
      startDate: date
    });
  };

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            History
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <DatePicker
            inline
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
        </Card.Content>
      </Card>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    coordinates: state.map.coordinates
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(mapActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDatePicker);
