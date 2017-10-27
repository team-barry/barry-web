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

  get path() {
    return this._path;
  }

  set path(value) {
    this._path = value;
  }

  push(key, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`).push(value, error => (error ? reject(error) : resolve()));
    });
  }

  remove(key) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`).remove(error => (error ? reject(error) : resolve()));
    });
  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`).set(value, error => (error ? reject(error) : resolve()));
    });
  }

  update(key, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`).update(value, error => (error ? reject(error) : resolve()));
    });
  }

  get(key = null) {
    let refPath;
    if (!this._path) {
      refPath = key;
    } else {
      refPath = key ? `${this._path}/${key}` : `${this._path}`;
    }

    console.log("get", refPath);
    return firebaseDb
      .ref(refPath)
      .once("value")
      .then(snapshot => {
        return snapshot.val();
      });
  }

  getAbsKey(key) {
    console.log("get with absolute key", key);
    return firebaseDb
      .ref(key)
      .once("value")
      .then(snapshot => {
        return snapshot.val();
      });
  }
}
