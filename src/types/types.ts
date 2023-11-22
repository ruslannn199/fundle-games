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

export type orderFields = {
  billerCity: string;
  billerLine1: string;
  billerLine2: string;
  billerName: string;
  billerPostalCode: string;
  billerState: string;
  recipientCity: string;
  recipientLine1: string;
  recipientLine2: string;
  recipientName: string;
  recipientPostalCode: string;
  recipientState: string;
}

export type docRefType = DocumentReference<DocumentData>;

export type docSnapshotDataType = DocumentSnapshot<DocumentData>;

export type userAuth = User | null;

export type ApiResponse<T> = {
  records: T;
  results: number;
}

export type ApiConfigResponse<T> = {
  configField: string;
  result: T;
}
