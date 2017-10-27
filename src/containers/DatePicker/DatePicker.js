import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import authActions from "redux/modules/auth/actions";
import locationActions from "redux/modules/location/actions";
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
    const user = this.props.user;
    this.props.handleGetUsingDates({ user: user });
  }

  componentWillUpdate(nextProps) {
    const prevselectedDate = DateFactory.formatDate(this.state.startDate);
    const nextselectedDate = nextProps.selectedDate;
    if (prevselectedDate !== nextselectedDate) {
      this.setState({ ...this.state, startDate: moment(nextselectedDate) });
      return true;
    }
    return false;
  }

  static PropTypes = {
    user: PropTypes.object,
    dates: PropTypes.object,
    selectedDate: PropTypes.string,
  };

  handleChange = date => {
    const formatDate = DateFactory.formatDate(date);
    this.setState({
      startDate: date,
    });
    this.props.handleGetCoordinates({
      user: this.props.user,
      selectedDate: formatDate,
    });
  };

  sieveDate = date => {
    const dates = this.props.dates;
    if (dates.get(DateFactory.formatDate(date))) {
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
    dates: state.location.dates,
    selectedDate: state.location.selectedDate,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(locationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDatePicker);
