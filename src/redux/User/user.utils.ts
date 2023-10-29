import { call, put } from 'redux-saga/effects';
import { userAuth, docRefType, docSnapshotDataType } from '../../types/types';
import { auth, handleUserProfile } from '../../utils/firebase.utils';
import { getDoc } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import ProductsActionCreators from './user.actions';

const { signInSuccess } = ProductsActionCreators;

// Save user to db helper
export function* getSnapshotFromUserAuth(user: userAuth, moreData?: object) {
  try {
    const userRef: docRefType = yield call(handleUserProfile, {
      userAuth: user,
      moreData,
    });

    const userDocumentData: docSnapshotDataType = yield getDoc(userRef);
    // Updating state when user changes
    yield put(
      signInSuccess({
        id: userDocumentData.id,
        email: userDocumentData.data()?.email,
        displayName: userDocumentData.data()?.displayName,
        photoURL: userDocumentData.data()?.photoURL || null,
        userRoles: userDocumentData.data()?.userRoles,
      })
    );
  } catch (err) {
    console.error(err);
  }
}

// Reset password helper
export const handleResetPasswordAPI = async (email: string): Promise<void> => {
  const config = { url: import.meta.env.DEV
    ? 'http://localhost:3000/login'
    : 'https://fundle-games.infinityfreeapp.com/login'
  };
  return sendPasswordResetEmail(auth, email, config);
}
