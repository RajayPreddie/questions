import { type SigninFormProps } from '@/types/signinForm';
import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import React from 'react';
const SigninForm: React.FC<SigninFormProps> = ({
  type,
  toggle,
  signInForm,
  onSubmit,
}) => {
  return (
    <Paper radius="md" p="xl" withBorder>
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
              onChange={(event) =>
                signInForm.setFieldValue('username', event.currentTarget.value)
              }
              radius="md"
              error={signInForm.errors.username && signInForm.errors.username}
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@google.com"
            value={signInForm.values.email}
            onChange={(event) =>
              signInForm.setFieldValue('email', event.currentTarget.value)
            }
            error={signInForm.errors.email}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={signInForm.values.password}
            onChange={(event) =>
              signInForm.setFieldValue('password', event.currentTarget.value)
            }
            error={
              signInForm.errors.password &&
              'Password should include at least 6 characters'
            }
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={signInForm.values.terms}
              onChange={(event) =>
                signInForm.setFieldValue('terms', event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
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
};
export default SigninForm;
