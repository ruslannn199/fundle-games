import type { User } from 'firebase/auth';
import type { useLocation, useNavigate } from 'react-router-dom';
import type { DocumentData, DocumentReference, DocumentSnapshot } from 'firebase/firestore';

export type WrapperProps = {
  className?: string;
  isUnusualWrapper?: boolean;
}

export type firebaseConfig = {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

export type loggedInfo = {
  name: string | null;
}

export type signProps = {
  changeActiveFn: (e: React.MouseEvent<HTMLElement>) => void;
}

export type loginFields = {
  email: string;
  password: string;
}

export type registrationFields = loginFields & {
  displayName: string;
  confirmPassword: string;
}

export type userMainInfo = {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export type userRefType = DocumentReference<DocumentData>;

export type userData = DocumentSnapshot<DocumentData>;

export type userAuth = User | null;

// ! Deprecated
export type userStateToProps = {
  user: {
    currentUser: currentUser;
  }
}

export type currentUser = User | userMainInfo | undefined;

export type withRouterProps = {
  location: ReturnType<typeof useLocation>;
  params: Record<string, string>;
  navigate: ReturnType<typeof useNavigate>;
}
