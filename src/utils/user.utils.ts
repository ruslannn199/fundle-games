import { call, put } from 'redux-saga/effects';
import { signInSuccess } from '../redux/User/user.action-creators';
import { userAuth, userRefType, userData } from '../types/types';
import { auth, handleUserProfile } from './firebase.utils';
import { getDoc } from 'firebase/firestore';

// Save user to db helper
export function* getSnapshotFromUserAuth(user: userAuth, moreData?: object) {
  try {
    const userRef: userRefType = yield call(handleUserProfile, {
      userAuth: user,
      moreData,
    });

    const userData: userData = yield getDoc(userRef);
    // Updating state when user changes
    yield put(
      signInSuccess({
        id: userData.id,
        email: userData.data()?.email,
        displayName: userData.data()?.displayName,
        userRoles: userData.data()?.userRoles,
      })
    )
  } catch (err) {
    console.error(err);
  }
}
