import firebase from 'firebase';
import { firebaseDb } from 'helpers/firebase';

export default class Comment {
  static push(user, text, title, image = null) {
    console.log(user.uid)
    firebaseDb.ref("comments/" + user.uid).push({
      uid: user.uid,
      text,
      title,
      created_at: firebase.database.ServerValue.TIMESTAMP,
      image_url: null,
      show_cd: 0, //0 = all
    })
  }
}
