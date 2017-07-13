import {Record} from 'immutable';

const ViewPortRecord = Record({
  latitude: null,
  longitude: null,
  zoom: 10,
  startDragLngLat: null,
  isDragging: null
});

export default class ViewPort extends ViewPortRecord{
  hasLocation() {
    if(this.latitude && this.longitude) {
      return true;
    }
    return false;
  }
  
  getLocationArray() {
    return [this.longitude, this.latitude];
  }
  
  getZoomArray() {
    return [this.zoom];
  }
};
