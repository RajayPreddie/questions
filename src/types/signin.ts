import { type User } from 'firebase/auth';

// Types for signin
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
