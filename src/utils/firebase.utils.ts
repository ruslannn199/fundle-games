import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// Types
import type { firebaseConfig } from '../types/types';
import type { Auth, UserCredential, OAuthCredential, User } from 'firebase/auth';
import type { Firestore, DocumentReference } from 'firebase/firestore';

export const localConfig: firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

const firebaseApp = initializeApp(localConfig);

export const auth: Auth = getAuth();
export const db: Firestore = getFirestore();

const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({
  prompt: 'select_account'
});
export const signInWithGoogle = async () => {
  try {
    const result: UserCredential = await signInWithPopup(auth, GoogleProvider);
    const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
    const user: User = result.user;
  } catch (err) {
    throw err;
  }
}

export const handleUserProfile = async (
  userAuth: User | null,
  additionalData: object): Promise<DocumentReference | undefined> => {
  try {
    if (!userAuth) return;
    const { uid } = userAuth;
    const userRef: DocumentReference = doc(db, 'users', uid);
    await setDoc(userRef, additionalData);
    return userRef;
  } catch (err) {
    throw err;
  }
}
