import {Record} from 'immutable';
import uuid from 'uuid/v1';

const CoordinateRecord = Record({
  coordinate_id: null,
  latitude: null,
  longitude: null,
  created_at: null,
});

export default class Coordinate extends CoordinateRecord{
  constructor(values) {
    super({coordinate_id: uuid(), created_at: Date.now(), ...values});
  };

  hasLocation() {
    if(this.latitude && this.longitude) {
      return true;
    }
    return false;
  };

  getLocationArray() {
    return [this.longitude, this.latitude];
  };
};
