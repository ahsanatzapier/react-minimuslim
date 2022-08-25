// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

/**
 * ##############################
 * Setting up the Authentication
 * ##############################
 */
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

/**
 * ####################
 * Setting up Database
 * ####################
 */
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection, // needed for upload
  writeBatch, // needed for upload
  query, // needed to get
  getDocs, // needed to get
} from "firebase/firestore";

/**
 * ################################
 * Web App's Firebase configuration
 * ################################
 */
const firebaseConfig = {
  apiKey: "AIzaSyAhcG5W5kDhedHZi2EGVcZxkvjTrDYMMWQ",
  authDomain: "minimuslims-db.firebaseapp.com",
  projectId: "minimuslims-db",
  storageBucket: "minimuslims-db.appspot.com",
  messagingSenderId: "1070735973988",
  appId: "1:1070735973988:web:8d441fabb7b6dc77428971",
};

/**
 * ////////////////////
 * Initialize Firebase
 * ////////////////////
 */
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);

/**
 * ///////////////////////////////////////
 * Initializing the Google Auth Provider
 * ///////////////////////////////////////
 */
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

/**
 * **************************
 * addCollectionAndDocuments
 * **************************
 */
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
};

/**
 * **************************
 * getCatagoriesAndDocuments
 * **************************
 */
export const getCatagoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

/**
 * ***************************
 * createUserDocumentFromAuth
 * ***************************
 */
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  // checking if the user exists
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  // if snapshot does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // setting the doc
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  return userDocRef;
};

/**
 * ***********************************
 * createAuthUserWithEmailAndPassword
 * ***********************************
 */
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * ***********************************
 * signInAuthUserWithEmailAndPassword
 * ***********************************
 */
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * *************
 * signOutUser
 * *************
 */
export const signOutUser = async () => {
  await signOut(auth);
};

/**
 * ***************************
 * onAuthStateChangedListener
 * ***************************
 */
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
