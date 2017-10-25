import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import authActions from "redux/modules/auth/actions";
import * as mapActions from "redux/modules/map";
import { Card } from "semantic-ui-react";
import moment from "moment";
import DatePicker from "react-datepicker";
import { DateFactory } from "helpers/date";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

class MyDatePicker extends Component {
  constructor() {
    super();
    this.state = {
      startDate: moment(),
    };
  }

  componentWillMount() {
    this.props.getUsingDates();
  }

  componentWillUpdate(nextProps) {
    const prevSelectedDay = DateFactory.formatDate(this.state.startDate);
    const nextSelectedDay = nextProps.selectedDay;
    if (prevSelectedDay !== nextSelectedDay) {
      this.setState({ ...this.state, startDate: moment(nextSelectedDay) });
      return true;
    }
    return false;
  }

  static PropTypes = {
    user: PropTypes.object,
    coordinates: PropTypes.object,
    usingDates: PropTypes.object,
    selectedDay: PropTypes.string,
  };

  handleChange = date => {
    const formatDate = DateFactory.formatDate(date);
    this.setState({
      startDate: date,
    });
    this.props.getSelectedCoordinates(formatDate);
  };

  sieveDate = date => {
    const usingDates = this.props.usingDates;
    if (usingDates.get(DateFactory.formatDate(date))) {
      return "having";
    }
    return "not-having";
  };

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>History</Card.Header>
        </Card.Content>
        <Card.Content>
          <DatePicker
            inline
            selected={this.state.startDate}
            onChange={this.handleChange}
            dayClassName={this.sieveDate}
          />
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    selectedDay: state.map.selectedDay,
    usingDates: state.map.usingDates,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(mapActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDatePicker);
