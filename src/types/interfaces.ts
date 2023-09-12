import type { User } from 'firebase/auth';

export interface CurrentUser {
  email: string;
  displayName: string;
  id: string;
  photoURL: string | null;
  userRoles: string[];
}

export interface EmailPassword {
  email: string;
  password: string;
}

export interface HandleUser {
  userAuth: User | null;
  moreData?: object;
}

export interface UserCredentials {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
