import type { User } from 'firebase/auth';
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

export type userDocumentDataType = DocumentSnapshot<DocumentData>;

export type userAuth = User | null;
