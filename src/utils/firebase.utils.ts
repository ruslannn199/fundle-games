// Axios
import axios, { AxiosResponse } from 'axios';
// Firebase
import { FirebaseApp, initializeApp } from 'firebase/app';
import { doc, setDoc, getDoc, initializeFirestore, persistentLocalCache, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
// Types
import type { firebaseConfig, docSnapshotDataType, docRefType, ApiConfigResponse } from '../types/types';
import type { Auth, User } from 'firebase/auth';
import type { Firestore, DocumentReference } from 'firebase/firestore';
import type { HandleUser } from '../types/interfaces';
// Utils
import { makeFetchURL } from '.';

export const localConfig: AxiosResponse<ApiConfigResponse<firebaseConfig>> = await axios.get(makeFetchURL('config/firebaseConfig'));

const app: FirebaseApp = initializeApp(localConfig.data.result);

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
