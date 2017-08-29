import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ReactMapboxGl, {Marker, ZoomControl} from 'react-mapbox-gl';
import FixedButton from 'components/Buttons/FixedButton/FixedButton';
import * as mapActions from 'redux/modules/map';
import styles from './UserMap.css';
import pulseCircleStyles from './PulseCircle.css';
import markerCircleStyles from './markerCircle.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import {DateFactory} from 'helpers/date';

const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const Map = ReactMapboxGl({
  accessToken: token
});
const mapStyle = {
  flex: 1,
  width: "100%",
  height: "100%"
};

class UserMap extends Component {
  constructor() {
    super();
    this.state = {
      zoom: 13,
      position: [0, 0]
    };
  };

  static PropTypes = {
    position: PropTypes.array.isRequired,
    coordinates: PropTypes.object.isRequired
  };

  setPosition = (props) => {
    if(!props.position) return false;
    if(this.state.position === props.position) return false;

    this.setState({
      ...this.state,
      position: props.position
    });
    return true;
  };

  componentWillMount() {
    this.setPosition(this.props);
  };

  componentWillUpdate(nextProps) {
    const positionFlag = this.setPosition(nextProps);
    if(positionFlag) {
      return true;
    }
    return false;
  }

  hundleToMoveCurrentLocation = (event) => {
    console.log("move current location!");
    this.setState({
      ...this.state,
      position: this.props.position
    });
  };

  generatePositions = () => {
    const coordinates = this.props.coordinates;
    const markers = coordinates.map((v) => {
      return (
        <Marker
          key={v.coordinate_id}
          coordinates={v.getLocationArray()}
        >
          <div className="marker circle" style={markerCircleStyles} />
        </Marker>
      )
    });
    return markers;
  };

  onZoomEnd = (map, event) => {
    const zoom = map.getZoom();
    this.setState({
      ...this.state,
      zoom
    });
  }

  render() {
    const markers = this.generatePositions();
    const mapDesign = "mapbox://styles/mapbox/streets-v9";
    return (
      <div className="map" style={styles}>
        <Map
          style={mapDesign}
          containerStyle={mapStyle}
          center={this.state.position}
          zoom={[this.state.zoom]}
          attributionControl={false}
          onZoomEnd = {this.onZoomEnd}
        >
          <Marker coordinates={this.state.position}>
            <div className="pulseCircle" style={pulseCircleStyles} />
          </Marker>
          {markers}
          <ZoomControl />
        </Map>
        <FixedButton onClick={this.hundleToMoveCurrentLocation} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const mapData = state.map;
  const isToday = mapData.selectedDay === DateFactory.today();
  const coordinates = isToday ? mapData.coordinates : mapData.selectedCoordinates;
  let position = null;
  if(coordinates && coordinates.size > 0) {
    position = coordinates.last().getLocationArray();
  };

  return {
    isToday,
    coordinates,
    position
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(mapActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMap);
