import admin from './admin';
import firebase from './firebase';

const db = firebase.firestore();

export {
  admin,
  firebase,
  db
};