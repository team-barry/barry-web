import { Record } from "immutable";
import uuid from "uuid/v1";
import { DateFactory } from "helpers/date";

const CoordinateRecord = Record({
  coordinate_id: null,
  latitude: null,
  longitude: null,
  created_at: null,
});

export default class Coordinate extends CoordinateRecord {
  constructor(values) {
    if (values && values.coordinate_id) {
      super(values);
    } else {
      super({ coordinate_id: uuid(), created_at: DateFactory.now(), ...values });
    }
  }

  hasLocation() {
    if (this.latitude && this.longitude) {
      return true;
    }
    return false;
  }

  get lat() {
    return this.latitude;
  }

  get lng() {
    return this.longitude;
  }

  // [NOTE]
  // React-Mapboxは[longitude, latitude]の順で指定されているため
  // こちらのメソッドを仕様する
  getLocationArray() {
    return [this.longitude, this.latitude];
  }

  // [NOTE]
  // GeoFireは[latitude, longitude]の順に指定されているため
  // こちらのメソッドを仕様する
  getGeoLocationArray() {
    return [this.latitude, this.longitude];
  }
}
