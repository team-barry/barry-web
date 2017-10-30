import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactMapboxGl, { Marker, ZoomControl } from "react-mapbox-gl";
import FixedButton from "components/Buttons/FixedButton/FixedButton";
import * as mapActions from "redux/modules/map";
import styles from "./UserMap.css";
import pulseCircleStyles from "./PulseCircle.css";
import markerCircleStyles from "./markerCircle.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { DateFactory } from "helpers/date";

const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const Map = ReactMapboxGl({
  accessToken: token,
});
const mapStyle = {
  flex: 1,
  width: "100%",
  height: "100%",
};

class UserMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 13,
    };
  }

  static PropTypes = {
    viewport: PropTypes.array.isRequired,
    current: PropTypes.array.isRequired,
    coordinates: PropTypes.object.isRequired,
    getSelectedCoordinates: PropTypes.func.isRequired,
  };

  componentWillUpdate(nextProps) {
    if (this.state.viewport === nextProps.viewport) return false;
  }

  // 移動ボタンを押すと現在地に移動する
  hundleToMoveCurrentLocation = event => {
    console.log("move current location!");
    this.props.getSelectedCoordinates(DateFactory.today());
  };

  generatePositions = () => {
    const coordinates = this.props.coordinates;
    const markers = coordinates.map(v => {
      return (
        <Marker key={v.coordinate_id} coordinates={v.getLocationArray()}>
          <div className="marker circle" style={markerCircleStyles} />
        </Marker>
      );
    });
    return markers;
  };

  onZoomEnd = (map, event) => {
    const zoom = map.getZoom();
    this.setState({
      ...this.state,
      zoom,
    });
  };

  render() {
    const markers = this.generatePositions();
    const mapDesign = "mapbox://styles/mapbox/streets-v9";
    return (
      <div className="map" style={styles}>
        <Map
          style={mapDesign}
          containerStyle={mapStyle}
          center={this.props.viewport}
          zoom={[this.state.zoom]}
          attributionControl={false}
          onZoomEnd={this.onZoomEnd}
        >
          <Marker coordinates={this.props.current}>
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

const mapStateToProps = state => {
  const { coordinates: currentCoordinates, selectedCoordinates, selectedDay } = state.map;
  const isToday = DateFactory.today() === selectedDay;
  const current = currentCoordinates.last().getLocationArray();
  const coordinates = isToday ? currentCoordinates : selectedCoordinates;
  let viewport = current;
  if (!isToday && coordinates.size > 0) viewport = coordinates.last().getLocationArray();
  return {
    selectedDay,
    coordinates,
    current,
    viewport,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(mapActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMap);
