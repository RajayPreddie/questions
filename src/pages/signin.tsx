import React, { useState } from 'react'
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'

import {auth} from '../firebase/firestoreConfig'
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
interface FormValues {
  email: string;
  username: string;
  password: string;
  terms: boolean;
}
const SignIn = () => {
  // Sign in with Email and Password
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
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

  return (
    <Paper radius="md" p="xl" withBorder >
    <Text size="lg" fw={500}>
      Welcome to Mantine, {type} with
    </Text>

  
    <form onSubmit={signInForm.onSubmit(() => {void signInWithEmailAndPassword(signInForm.values.email, signInForm.values.password)})}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Username"
              placeholder="Your username"
              value={signInForm.values.username}
              onChange={(event) => signInForm.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@google.com"
            value={signInForm.values.email}
            onChange={(event) => signInForm.setFieldValue('email', event.currentTarget.value)}
            error={signInForm.errors.email && 'Invalid email'}
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