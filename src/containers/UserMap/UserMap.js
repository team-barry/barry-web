import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import ReactMapboxGl from 'react-mapbox-gl';
import styles from './UserMap.css';

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
  
  render() {
    return (
      <div className="map" style={styles}>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={mapStyle}
          center={this.props.viewport.getLocationArray()}
          zoom={this.props.viewport.getZoomArray()}
        >
        </Map>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    viewport: state.map.viewport,
  };
}

export default withRouter(connect(mapStateToProps)(UserMap));
