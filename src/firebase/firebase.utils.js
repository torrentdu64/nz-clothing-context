import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDM9o5GTokE9FbTqQ9aLSj0WuQ5aTVYPb0",
  authDomain: "nz-db-9c284.firebaseapp.com",
  databaseURL: "https://nz-db-9c284.firebaseio.com",
  projectId: "nz-db-9c284",
  storageBucket: "nz-db-9c284.appspot.com",
  messagingSenderId: "648810017281",
  appId: "1:648810017281:web:3f7fa420629a8b0c104600",
  measurementId: "G-78F8EF886H"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
