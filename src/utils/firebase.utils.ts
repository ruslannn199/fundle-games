import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// Types
import type { firebaseConfig, userMainInfo } from '../types/types';
import type { Auth } from 'firebase/auth';
import type { Firestore, DocumentReference } from 'firebase/firestore';
import { HandleUser } from '../types/interfaces';

export const localConfig: firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

initializeApp(localConfig);

export const auth: Auth = getAuth();
export const db: Firestore = getFirestore();

export const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });

// !
// export const signInWithGoogle = async () => {
//   try {
//     const result: UserCredential = await signInWithPopup(auth, GoogleProvider);
//     googleSignInStart();
//     const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
//     const user: User = result.user;
//   } catch (err) {
//     throw err;
//   }
// }

export const handleUserProfile = async ({ userAuth, moreData }: HandleUser): Promise<DocumentReference | null> => {
  if (userAuth) {
    const { uid, displayName, email } = userAuth;
    const timeStamp = new Date();
    const userRoles = ['user'];
    const userRef: DocumentReference = doc(db, 'users', uid);
    const userData = await getDoc(userRef);
    if (!userData.exists) {
      try {
        await setDoc(userRef, {
          email, displayName, createdDate: timeStamp, userRoles, ...moreData
        });
      } catch (err) {
        console.error(err);
      }
    }
    return userRef;
  } else return null;
}

// TODO add types
export const getCurrentUser = async () => {
  const { currentUser } = auth;
  if (currentUser) {
    const { displayName, email, uid, photoURL } = currentUser;
    return { displayName, email, id: uid, photoURL };
  } else return null;
}
