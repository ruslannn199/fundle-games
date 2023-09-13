import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { EmailSignInStartAction, EmailSignUpStartAction, PasswordRecoveryStartAction } from './user.actions';
import { GoogleProvider, auth, getCurrentUser } from '../../utils/firebase.utils';
import { put, all, call, takeLatest } from 'redux-saga/effects';
import { recoverPasswordSuccess, signOutSuccess, userError } from './user.action-creators';
import { ActionType } from '../../types/enums';
import { getSnapshotFromUserAuth, handleResetPasswordAPI } from '../../utils/user.utils';
import { userAuth } from '../../types/types';

// Worker sagas
export function* emailSignIn({
  payload: { email, password }
}: EmailSignInStartAction) {
  try {
    const { user } = yield signInWithEmailAndPassword(auth, email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
    if (err instanceof Error) yield put(userError([err.message]));
  }
}

export function* emailSignOut() {
  try {
    yield signOut(auth);
    yield put(signOutSuccess());
  } catch (err) {
    if (err instanceof Error) yield put(userError([err.message]));
  }
}

export function* emailSignUp({
  payload: { email, password, displayName },
}: EmailSignUpStartAction) {
  try {
    const { user } = yield createUserWithEmailAndPassword(auth, email, password);
    yield getSnapshotFromUserAuth(user, { displayName });
  } catch (err) {
    if (err instanceof Error) yield put(userError([err.message]));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth: userAuth = yield getCurrentUser();
    if (userAuth) yield getSnapshotFromUserAuth(userAuth);
    return;
  } catch (err) {
    console.error(err);
  }
}

export function* recoverPassword({ payload }: PasswordRecoveryStartAction) {
  try {
    yield call(handleResetPasswordAPI, payload);
    yield put(recoverPasswordSuccess());
  } catch (err) {
    if (err instanceof Error) yield put(userError([err.message]));
  }
}

export function* googleSignIn() {
  try {
    const { user } = yield signInWithPopup(auth, GoogleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
    console.error(err);
  }
}

// Start sagas
export function* onCheckUserSession() {
  yield takeLatest(ActionType.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
  yield takeLatest(ActionType.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* onEmailSignOutStart() {
  yield takeLatest(ActionType.EMAIL_SIGN_OUT_START, emailSignOut);
}

export function* onEmailSignUpStart() {
  yield takeLatest(ActionType.EMAIL_SIGN_UP_START, emailSignUp);
}

export function* onRecoverPasswordStart() {
  yield takeLatest(ActionType.PASSWORD_RECOVERY_START, recoverPassword);
}

export function* onGoogleSignInStart() {
  yield takeLatest(ActionType.GOOGLE_SIGN_IN_START, googleSignIn);
}

// Global saga
export default function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onEmailSignInStart),
    call(onEmailSignOutStart),
    call(onEmailSignUpStart),
    call(onRecoverPasswordStart),
    call(onGoogleSignInStart),
  ]);
}