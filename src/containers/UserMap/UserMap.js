import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactMapboxGl, { Marker, ZoomControl, Popup } from "react-mapbox-gl";
import FixedButton from "components/Buttons/FixedButton/FixedButton";
import locationActions from "redux/modules/location/actions";
import trackingActions from "redux/modules/tracking/actions";
import styles from "./UserMap.css";
import pulseCircleStyles from "./PulseCircle.css";
import markerCircleStyles from "./markerCircle.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { DateFactory } from "helpers/date";
import PopupComment from "components/PopupComment/PopupComment";

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
    user: PropTypes.object.isRequired,
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
    this.props.handleGetCoordinates({
      user: this.props.user,
      selectedDate: this.props.selectedDate,
    });
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

  generateComments = () => {
    // const bows = this.props.bows;
    const coordinate = this.props.coordinates.last();
    const bows = [
      {
        comment_id: "uasdjasldkajsldk",
        comment: "Test",
        coordinate: coordinate,
      },
    ];
    const popupBows = bows.map(v => {
      return (
        <Popup key={v.comment_id} coordinates={v.coordinate.getLocationArray()} anchor="bottom">
          <PopupComment value={v.comment} />
        </Popup>
      );
    });
    return popupBows;
  };

  render() {
    const markers = this.generatePositions();
    const comments = this.generateComments();
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
          <Marker coordinates={this.props.viewport}>
            <div className="pulseCircle" style={pulseCircleStyles} />
          </Marker>
          {markers}
          {comments}
          <ZoomControl />
        </Map>
        <FixedButton onClick={this.hundleToMoveCurrentLocation} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const selectedDate = state.location.selectedDate;
  const isToday = selectedDate === DateFactory.today();
  const coordinates = isToday ? state.tracking.trackedCoordinates : state.location.coordinates;

  let viewport;
  const _viewport = state.tracking.trackedCoordinates.last().getLocationArray();
  if (!isToday && coordinates.size > 0) {
    viewport = coordinates.last().getLocationArray();
  } else {
    viewport = _viewport;
  }
  return {
    user: state.auth.user,
    selectedDate,
    coordinates,
    viewport,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(locationActions, dispatch),
    ...bindActionCreators(trackingActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMap);
