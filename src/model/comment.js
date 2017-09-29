import firebase from 'firebase';
import { firebaseDb } from 'helpers/firebase';

export default class Comment {
  static push(user, text, coordinates, image = null) {
    firebaseDb.ref("comments/" + user.uid).push({
      uid: user.uid,
      text,
      coordinates: [coordinates.toJS()[0]["latitude"], coordinates.toJS()[0]["longitude"]],
      created_at: firebase.database.ServerValue.TIMESTAMP,
      image_url: null,
      show_cd: 0, //0 = all
      coordinates_raw: JSON.stringify(coordinates),
    })
  }
}
