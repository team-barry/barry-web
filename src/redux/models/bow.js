import { Record } from "immutable";
import uuid from "uuid/v1";
import { DateFactory } from "helpers/date";
import Coordinate from "./coordinate";
import User from "./user";

const BowRecord = Record({
  bow_id: null,
  comment: null,
  created_at: null,
  coordinate: null,
  user: null,
});

export default class Bow extends BowRecord {
  constructor(values) {
    if (values && values.bow_id) {
      super(values);
    } else {
      super({ bow_id: uuid(), created_at: DateFactory.now(), ...values });
    }
  }

  get id() {
    return this.bow_id;
  }

  save() {
    return {
      bow_id: this.bow_id,
      comment: this.comment,
      created_at: this.created_at,
      latitude: this.coordinate.latitude,
      longitude: this.coordinate.longitude,
      uid: this.user.uid,
    };
  }

  getLocationForGeoFire() {
    return this.coordinate.getGeoLocationArray();
  }

  static newBowFromDB(bow, user) {
    return new Bow({
      bow_id: bow.bow_id,
      comment: bow.comment,
      created_at: bow.created_at,
      coordinate: new Coordinate({
        latitude: bow.latitude,
        longitude: bow.longitude,
      }),
      user: new User(user),
    });
  }
}
