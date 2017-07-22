import {Record} from 'immutable';

const CoordinateRecord = Record({
  coordinate_id: null,
  latitude: null,
  longitude: null,
  created_at: null,
});

export default class Coordinate extends CoordinateRecord{
  hasLocation() {
    if(this.latitude && this.longitude) {
      return true;
    }
    return false;
  };
  
  getLocationArray() {
    return [this.longitude, this.latitude];
  }
};