// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Setting up the Authentication
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

// Setting up firebase
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhcG5W5kDhedHZi2EGVcZxkvjTrDYMMWQ",
  authDomain: "minimuslims-db.firebaseapp.com",
  projectId: "minimuslims-db",
  storageBucket: "minimuslims-db.appspot.com",
  messagingSenderId: "1070735973988",
  appId: "1:1070735973988:web:8d441fabb7b6dc77428971"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initializing the Google Auth Provider
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log(userDocRef)

  // checking if the user exists
  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot.exists())

  // if snapshot does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    // setting the doc
    try {
      await setDoc(userDocRef, { displayName, email, createdAt })
    } catch (error) {
      console.log("Error creating user", error.message)

    }
  }
  return userDocRef


}
