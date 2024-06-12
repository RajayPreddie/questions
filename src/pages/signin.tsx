import React, { useEffect} from 'react'
import {useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth,} from '../firebase/firestoreConfig'
import { useToggle} from '@mantine/hooks';
import { useForm} from '@mantine/form';
import { type FormValues } from '../types/formTypes';
import SignInForm from '../components/form/signinForm';
import * as constants from '../constants/signin'
import { User } from 'firebase/auth';
import  { useRouter } from 'next/router';
import { handleSignIn } from '@/functions/sigin';

interface SignInResponse {
  message: string;
  user: User;
}
const SignIn = () => {
  // Sign in with Email and Password
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  // Create User with Email and Password
  const [createUserWithEmailAndPassword, createdUser, createdUserLoading, createdUserError] = useCreateUserWithEmailAndPassword(auth);
  const [type, toggle] = useToggle(['login',
    'register']);
  // SignIn State
  const signInForm = useForm(constants.INITIAL_FORM_SETUP);
  // Shift to different pages
  const router = useRouter();



const onSubmit = (values: FormValues, event: React.FormEvent<HTMLFormElement> | undefined) => {
    event?.preventDefault()
    handleSignIn(signInForm.values, type,signInForm).catch((error) => console.log("Error in onSubmit:", error));
}
useEffect(() => {
  if (createdUserError) {
    if (createdUserError.code === 'auth/email-already-in-use') {
      signInForm.setFieldError('email', 'Email already in use');
    }
}
}, [createdUserError, signInForm])
  return (
 <SignInForm 
  type={type}
  signInForm={signInForm}
  onSubmit={onSubmit}
  toggle={toggle}
 />
  );
}
export default SignIn;