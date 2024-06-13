import { type User } from 'firebase/auth';

export interface FormValues {
  email: string;
  username: string;
  password: string;
  terms: boolean;
}

export interface SignInResponse {
  message: string;
  user: User;
}
export interface ErrorResponse {
  error: string;
}
