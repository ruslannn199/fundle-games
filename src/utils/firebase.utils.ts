// Firebase
import { FirebaseApp, initializeApp } from 'firebase/app';
import { doc, setDoc, getDoc, initializeFirestore, persistentLocalCache, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
// Types
import type { firebaseConfig, docSnapshotDataType, docRefType } from '../types/types';
import type { Auth, User } from 'firebase/auth';
import type { Firestore, DocumentReference } from 'firebase/firestore';
import type { HandleUser } from '../types/interfaces';

export const localConfig: firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
}

const app: FirebaseApp = initializeApp(localConfig);

export const auth: Auth = getAuth();
export const db: Firestore = initializeFirestore(app, {
  localCache: persistentLocalCache({
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  }),
});

export const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });

export const handleUserProfile = async ({ userAuth, moreData }: HandleUser): Promise<DocumentReference | null> => {
  if (userAuth) {
    const { uid, displayName, email } = userAuth;
    const timeStamp = new Date();
    const userRoles = ['user'];
    const userRef: docRefType = doc(db, 'users', uid);
    const userData: docSnapshotDataType = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(userRef, {
          email,
          displayName,
          createdDate: timeStamp,
          userRoles,
          ...moreData,
        });
      } catch (err) {
        console.error(err);
      }
    }
    return userRef;
  }
  return null;
}

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
}
