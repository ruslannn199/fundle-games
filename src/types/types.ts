import { UserTypes } from './enums';

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

export type userReducerAction = {
  type: UserTypes | string;
  payload: any;
}
