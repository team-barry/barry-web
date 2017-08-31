import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Card, Feed} from 'semantic-ui-react'
import moment from 'moment';
import * as authActions from 'redux/modules/auth';
import * as mapActions from 'redux/modules/map';
import {DateFactory} from 'helpers/date';
import TrackingCard from 'components/TrackingCard/TrackingCard';
import './TrackingCardList.css'

const LIMIT = 5

class TrackingCardList extends Component {
  static PropTypes = {
    user: PropTypes.object,
    coordinates: PropTypes.object
  }

  coordinatesEventList = (coordinates, limit) => {
    const currents = coordinates.toJS().slice(-limit).reverse();
    return currents.map(coordinate => {
      return <TrackingCard key={coordinate.coordinate_id} coordinate={coordinate} />
    });
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            Trackings - {moment(this.props.selectedDay).format('MM-DD')}
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>
            {this.coordinatesEventList(this.props.coordinates, LIMIT)}
          </Feed>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  const {coordinates: currentCoordinates, selectedCoordinates, selectedDay} = state.map;
  const isToday = DateFactory.today() === selectedDay;
  const coordinates = isToday ? currentCoordinates : selectedCoordinates;
  return {
    user: state.auth.user,
    selectedDay: state.map.selectedDay,
    isToday,
    coordinates,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(mapActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackingCardList);
