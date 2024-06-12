import React, { useEffect, useState } from 'react'
import {useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'

import {auth, db} from '../firebase/firestoreConfig'
import {collection, doc, getDocs, query, setDoc, where} from 'firebase/firestore'
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm} from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import { sign } from 'crypto';
import { FirebaseError, FirebaseOptions } from 'firebase/app';
import { AuthError } from 'firebase/auth';
interface FormValues {
  email: string;
  username: string;
  password: string;
  terms: boolean;
}
const SignIn = () => {
  // Sign in with Email and Password
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  // Create User with Email and Password
 
  const [createUserWithEmailAndPassword, createdUser, createdUserLoading, createdUserError] = useCreateUserWithEmailAndPassword(auth);
  const [type, toggle] = useToggle(['login',
    'register']);
  // SignIn State
  const signInForm = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
      terms: true,
    },
  
    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val: string) => (val.length > 6 ? null : 'Password should include at least 6 characters'),
    },
  });



  const handleSubmit = async (values: FormValues) => {
  

      console.log("Type:", type)
    if (type === 'login') {
      try {
      await signInWithEmailAndPassword(values.email, values.password);
      console.log("User signed in")
      } catch (error: unknown) {
        console.log("Error during sign in: ", error)
        if ((error as Error).message === "auth/user-not-found") {
          signInForm.setFieldError('email', 'User not found');
        } else if ((error as Error).message === "auth/wrong-password") {
          signInForm.setFieldError('password', 'Wrong password');
        }
      }
    } else {

       // Check if username already exists
       const usersCollectionRef = collection(db, 'users');
       const q = query(usersCollectionRef, where('username', '==', values.username));
       const querySnapshot = await getDocs(q);

       if (!querySnapshot.empty) {
         signInForm.setFieldError('username', 'Username already exists');
         return;
       }
      // Obtain the created user
    
      
      createUserWithEmailAndPassword(values.email, values.password).then(async (userCredential) => {
           // Check if undefined
      
      if (userCredential?.user) {
        const user = userCredential.user;
        
        // Add a user document in the Firestore users collection
        const document = doc(db, 'users', user.uid);
        await setDoc(document, {
          // Document fields
          username: values.username,
          createdAt: new Date().toISOString(),
          // TODO: Add more fields in the future (friend requests, etc.)
        });

      }

    }).catch(error=> {
        
        console.log("Error during sign up: ", error)
      });
     
   
    
      
       
     
      
    
     

    }
  

  
}

const onSubmit = (values: FormValues, event: React.FormEvent<HTMLFormElement> | undefined) => {
    event?.preventDefault()
    handleSubmit(values).catch((error) => console.log("Error in onSubmit:", error));
}

useEffect(() => {
  if (createdUserError) {
    if (createdUserError.code === 'auth/email-already-in-use') {
      signInForm.setFieldError('email', 'Email already in use');
    }
}
}, [createdUserError, signInForm])
  return (
    <Paper radius="md" p="xl" withBorder >
    <Text size="lg" fw={500}>
      Welcome to Mantine, {type} with
    </Text>
    <form onSubmit={signInForm.onSubmit(onSubmit)}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Username"
              placeholder="Your username"
              value={signInForm.values.username}
              onChange={(event) => signInForm.setFieldValue('username', event.currentTarget.value)}
              radius="md"
              error={signInForm.errors.username && signInForm.errors.username}
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@google.com"
            value={signInForm.values.email}
            onChange={(event) => signInForm.setFieldValue('email', event.currentTarget.value)}
            error={signInForm.errors.email}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={signInForm.values.password}
            onChange={(event) => signInForm.setFieldValue('password', event.currentTarget.value)}
            error={signInForm.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={signInForm.values.terms}
              onChange={(event) => signInForm.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}




export default SignIn;