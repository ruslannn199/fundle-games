import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { EmailSignInStartAction, EmailSignUpStartAction, PasswordRecoveryStartAction } from './user.actions';
import { GoogleProvider, auth, getCurrentUser } from '../../utils/firebase.utils';
import { put, all, call, takeLatest } from 'redux-saga/effects';
import { ActionType } from './user.actions';
import { getSnapshotFromUserAuth, handleResetPasswordAPI } from './user.utils';
import { userAuth } from '../../types/types';
import UserActionsCreators from './user.actions';
import LoadingActionCreators from '../Loading/loading.actions';

const { userError, signOutSuccess, recoverPasswordSuccess } = UserActionsCreators;
const { addLoadStart, removeLoadStart } = LoadingActionCreators;

// Worker sagas
export function* emailSignIn({
  payload: { email, password }
}: EmailSignInStartAction) {
  try {
    yield put(addLoadStart('signIn'));
    const { user } = yield signInWithEmailAndPassword(auth, email, password);
    yield getSnapshotFromUserAuth(user);
    yield put(removeLoadStart('signIn'));
  } catch (err) {
    if (err instanceof Error) yield put(userError([err.message]));
    yield put(removeLoadStart('signIn'));
  }
}

export function* emailSignOut() {
  try {
    yield put(addLoadStart('signOut'));
    yield signOut(auth);
    yield put(signOutSuccess(null));
    yield put(removeLoadStart('signOut'));
  } catch (err) {
    if (err instanceof Error) yield put(userError([err.message]));
    yield put(removeLoadStart('signOut'));
  }
}

export function* emailSignUp({
  payload: { email, password, displayName },
}: EmailSignUpStartAction) {
  try {
    yield put(addLoadStart('signUp'));
    const { user } = yield createUserWithEmailAndPassword(auth, email, password);
    yield getSnapshotFromUserAuth(user, { displayName });
    yield put(removeLoadStart('signUp'));
  } catch (err) {
    if (err instanceof Error) yield put(userError([err.message]));
    yield put(removeLoadStart('signUp'));
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
    yield put(recoverPasswordSuccess(true));
  } catch (err) {
    if (err instanceof Error) yield put(userError([err.message]));
  }
}

export function* googleSignIn() {
  try {
    yield put(addLoadStart('googleSignIn'));
    const { user } = yield signInWithPopup(auth, GoogleProvider);
    yield getSnapshotFromUserAuth(user);
    yield put(removeLoadStart('googleSignIn'));
  } catch (err) {
    console.error(err);
    yield put(removeLoadStart('googleSignIn'));
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