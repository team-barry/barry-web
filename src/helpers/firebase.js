import firebase from "firebase";

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_DATABASE_URL,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDb = firebase.database();
export const firebaseAuth = firebase.auth();

export class FirebaseList {
  constructor(path = null) {
    this._path = path;
  }

  _setPath(key) {
    if (!this._path && !key) {
      return "/";
    }
    if (!this._path) {
      return key;
    }
    if (!key) {
      return this._path;
    }
    return `${this._path}/${key}`;
  }

  get path() {
    return this._path;
  }

  set path(value) {
    this._path = value;
  }

  push(key, value) {
    return new Promise((resolve, reject) => {
      const uid = firebaseDb.ref().push().key;
      console.log("push", this._setPath(key), uid);
      firebaseDb.ref(`${this._setPath(key)}/${uid}`).set(value, error => (error ? reject(error) : resolve(uid)));
    });
  }

  remove(key) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(this._setPath(key)).remove(error => (error ? reject(error) : resolve()));
    });
  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(this._setPath(key)).set(value, error => (error ? reject(error) : resolve()));
    });
  }

  update(key, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(this._setPath(key)).update(value, error => (error ? reject(error) : resolve()));
    });
  }

  get(key = null) {
    return firebaseDb
      .ref(this._setPath(key))
      .once("value")
      .then(snapshot => {
        return snapshot.val();
      });
  }
}
