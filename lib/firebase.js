import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDLT95COAeOGdi1ZTvs17xccac_pxHHEk",
  authDomain: "room-for-rent-bustos.firebaseapp.com",
  projectId: "room-for-rent-bustos",
  storageBucket: "room-for-rent-bustos.appspot.com",
  messagingSenderId: "253589705859",
  appId: "1:253589705859:web:e361b0539759095fb437b6",
  measurementId: "G-YDPE00N9YV",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// // Firestore exports
export const firestore = firebase.firestore();
// export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

// Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
  };
}
export default firebase;
