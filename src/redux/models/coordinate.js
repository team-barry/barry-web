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

  getLocationArray() {
    return [this.longitude, this.latitude];
  }
}
