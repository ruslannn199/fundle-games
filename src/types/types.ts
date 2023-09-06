import type { User } from 'firebase/auth';
import type { ActionType } from './enums';
import type { useLocation, useNavigate } from 'react-router-dom';
import type reducers from '../redux/rootReducer';

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
  photo: string | null;
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

export type userStateToProps = {
  user: {
    currentUser: currentUser;
  }
}

export type currentUser = User | userMainInfo | undefined;

export type userState = {
  currentUser: currentUser | null;
  userErrors: string[];
}

export type withRouterProps = {
  location: ReturnType<typeof useLocation>;
  params: Record<string, string>;
  navigate: ReturnType<typeof useNavigate>;
}

export type rootState = ReturnType<typeof reducers>;
