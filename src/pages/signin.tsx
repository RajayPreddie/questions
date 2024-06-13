import SignInForm from '../components/form/signinForm';
import * as constants from '../constants/signin';
import { auth } from '../firebase/firestoreConfig';
import { type FormValues } from '../types/signin';
import { handleSignIn } from '@/functions/sigin';
import { useForm } from '@mantine/form';
import { useToggle } from '@mantine/hooks';
import React, { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

const SignIn = () => {
  // Create User with Email and Password
  const [
    _createUserWithEmailAndPassword,
    _createdUser,
    _createdUserLoading,
    createdUserError,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [type, toggle] = useToggle(['login', 'register']);
  // SignIn State
  const signInForm = useForm(constants.INITIAL_FORM_SETUP);

  const onSubmit = async (
    values: FormValues,
    event: React.FormEvent<HTMLFormElement> | undefined,
  ) => {
    event?.preventDefault();
    await handleSignIn(signInForm.values, type, signInForm);
  };
  useEffect(() => {
    if (createdUserError) {
      if (createdUserError.code === 'auth/email-already-in-use') {
        signInForm.setFieldError('email', 'Email already in use');
      }
    }
  }, [createdUserError, signInForm]);
  return (
    <SignInForm
      type={type}
      signInForm={signInForm}
      onSubmit={onSubmit}
      toggle={toggle}
    />
  );
};
// eslint-disable-next-line import/no-unused-modules
export default SignIn;
