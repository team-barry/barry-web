import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Feed } from "semantic-ui-react";
import moment from "moment";
import locationActions from "redux/modules/location/actions";
import { DateFactory } from "helpers/date";
import TrackingCard from "components/TrackingCard/TrackingCard";
import "./TrackingCardList.css";

const LIMIT = 5;

class TrackingCardList extends Component {
  static PropTypes = {
    user: PropTypes.object,
    coordinates: PropTypes.object,
  };

  coordinatesEventList = (coordinates, limit) => {
    const currents = coordinates
      .toJS()
      .slice(-limit)
      .reverse();
    return currents.map(coordinate => {
      return <TrackingCard key={coordinate.coordinate_id} coordinate={coordinate} />;
    });
  };

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>Trackings - {moment(this.props.selectedDate).format("MM-DD")}</Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>{this.coordinatesEventList(this.props.coordinates, LIMIT)}</Feed>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const selectedDate = state.location.selectedDate;
  const isToday = selectedDate === DateFactory.today();
  const coordinates = isToday ? state.tracking.trackedCoordinates : state.location.coordinates;
  return {
    user: state.auth.user,
    selectedDate,
    coordinates,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackingCardList);
