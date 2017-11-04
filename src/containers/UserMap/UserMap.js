import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactMapboxGl, { Marker, ZoomControl, Popup } from "react-mapbox-gl";
import FixedButton from "components/Buttons/FixedButton/FixedButton";
import locationActions from "redux/modules/location/actions";
import trackingActions from "redux/modules/tracking/actions";
import messageActions from "redux/modules/message/actions";
import getBowsActions from "redux/modules/getBows/actions";
import styles from "./UserMap.css";
import pulseCircleStyles from "./PulseCircle.css";
import markerCircleStyles from "./markerCircle.css";
import { DateFactory } from "helpers/date";
import PopupComment from "components/PopupComment/PopupComment";
import "mapbox-gl/dist/mapbox-gl.css";
import GeoFire from "geofire";

const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const minZoomParam = 11.0;
const Map = ReactMapboxGl({
  accessToken: token,
  minZoom: minZoomParam,
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
      distance: 10,
      viewport: props.current.getLocationArray(),
    };
  }

  static PropTypes = {
    user: PropTypes.object.isRequired,
    viewport: PropTypes.array.isRequired,
    current: PropTypes.array.isRequired,
    coordinates: PropTypes.object.isRequired,
    getSelectedCoordinates: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
    handleGetBows: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.handleGetBows({
      coordinate: this.props.current,
    });
  }

  componentWillUpdate(nextProp, nextState) {
    // [TODO]
    // Firebaseとの通信を少なくするために，ズームの最大値を設けて，コメントの半径距離を制限している
    // 重要度などでコメントの取得のフィルタリングを行うことで
    // コメントの取得量を制限したい
    if (nextState.zoom < this.state.zoom && nextState.zoom <= minZoomParam) {
      this.props.createMessage(new Error("MIN_ZOOM_ERROR"));
    }

    if (this.state.distance < nextState.distance) {
      this.props.handleGetBows({
        coordinate: this.props.current,
        radius: nextState.distance,
      });
    }
  }

  // 移動ボタンを押すと現在地に移動する
  hundleToMoveCurrentLocation = event => {
    console.log("move current location!");
    this.setState({
      ...this.state,
      viewport: this.props.current.getLocationArray(),
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

  generateComments = () => {
    // const bows = this.props.bows;
    const { bows } = this.props;
    const popupBowsMap = bows.map(v => {
      return (
        <Popup key={v.bow_id} coordinates={v.coordinate.getLocationArray()} anchor="bottom">
          <PopupComment name={v.user.screenName} value={v.comment} />
        </Popup>
      );
    });
    return popupBowsMap.valueSeq().toArray();
  };

  onMoveEnd = (map, event) => {
    console.log("call moveEnd event");
    const bounds = map.getBounds();
    const zoom = map.getZoom();
    const distance = GeoFire.distance([bounds._sw.lat, bounds._sw.lng], [bounds._ne.lat, bounds._ne.lng]);
    this.setState({
      ...this.state,
      zoom,
      distance,
    });
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
          center={this.state.viewport}
          zoom={[this.state.zoom]}
          attributionControl={false}
          onMoveEnd={this.onMoveEnd}
        >
          <Marker coordinates={this.props.current.getLocationArray()}>
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

  const bows = state.getBows.bows;
  const current = state.tracking.trackedCoordinates.last();

  return {
    user: state.auth.user,
    selectedDate,
    coordinates,
    current,
    bows,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(locationActions, dispatch),
    ...bindActionCreators(trackingActions, dispatch),
    ...bindActionCreators(messageActions, dispatch),
    ...bindActionCreators(getBowsActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMap);
