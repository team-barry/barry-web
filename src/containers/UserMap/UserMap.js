import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import ReactMapboxGl, {Marker, ZoomControl} from 'react-mapbox-gl';
import FixedButton from 'components/Buttons/FixedButton/FixedButton';
import * as mapActions from 'redux/modules/map';
import styles from './UserMap.css';
import pulseCircleStyles from './PulseCircle.css';
import markerCircleStyles from './markerCircle.css';
import 'mapbox-gl/dist/mapbox-gl.css';

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
      zoom: 13
    };
  };

  static PropTypes = {
    viewport: PropTypes.object.isRequired
  };

  hundleToMoveCurrentLocation = (event) => {
    console.log("move current location!");
    this.props.setViewPort(this.props.viewport);
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
    this.setState({zoom});
  }

  render() {
    const markers = this.generatePositions();
    const mapDesign = "mapbox://styles/mapbox/streets-v9";
    return (
      <div className="map" style={styles}>
        <Map
          style={mapDesign}
          containerStyle={mapStyle}
          center={this.props.position}
          zoom={[this.state.zoom]}
          attributionControl={false}
          onZoomEnd = {this.onZoomEnd}
        >
          <Marker coordinates={this.props.position}>
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
  return {
    viewport: state.map.viewport,
    position: state.map.viewport.getLocationArray(),
    coordinates: state.map.coordinates
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(mapActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserMap));
