import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-compass.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-geolocate.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-in.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-out.svg';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import ReactMapboxGl, {Marker} from 'react-mapbox-gl';
import FixedButton from 'components/Buttons/FixedButton/FixedButton';
import * as mapActions from 'redux/modules/map';
import styles from './UserMap.css';
import pulseCircleStyles from './PulseCircle.css';

const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const Map = ReactMapboxGl({
  accessToken: token
});
const mapStyle = {
  width: "100vw",
  height: "100vh"
}

class UserMap extends Component {
  static PropTypes = {
    viewport: PropTypes.object.isRequired
  };
  
  hundleToMoveCurrentLocation = (event) => {
    console.log("move current location!");
    this.props.setViewPort(this.props.viewport);
  };
  
  render() {
    return (
      <div className="map" style={styles}>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={mapStyle}
          center={this.props.position}
          zoom={this.props.zoom}
          attributionControl={false}
        >
          <Marker
            coordinates={this.props.position}
          >
            <div className="pulseCircle" style={pulseCircleStyles} />
          </Marker>
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
    zoom: state.map.viewport.getZoomArray()
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(mapActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserMap));
