import * as constants from '@/constants/questions_form';
import { Button, Paper, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useToggle } from '@mantine/hooks';
import React from 'react';

// TODO: add logic for adding a question category
// TODO: Use a toggle to decide between creating a new category or selecting an existing category
const QuestionsForm = () => {
  const [_type, _toggle] = useToggle(['Create Category', 'Select Category']);
  const signInForm = useForm(constants.INITIAL_QUESTIONS_FORM_SETUP);
  return (
    <Paper radius="md" p="xl" withBorder>
      <Text size="lg" fw={500}>
        Add a question
      </Text>
      <form>
        <Stack>
          <TextInput
            label="Question Category"
            placeholder="Your category"
            value={signInForm.values.category}
            onChange={(event) =>
              signInForm.setFieldValue('categoy', event.currentTarget.value)
            }
            radius="md"
            error={signInForm.errors.category && signInForm.errors.category}
          />
          <TextInput
            label="Question"
            placeholder="Your question"
            value={signInForm.values.question}
            onChange={(event) =>
              signInForm.setFieldValue('question', event.currentTarget.value)
            }
            radius="md"
            error={signInForm.errors.question && signInForm.errors.question}
          />

          <TextInput
            required
            label="Purpose"
            placeholder="Purpose of the question"
            value={signInForm.values.purpose}
            onChange={(event) =>
              signInForm.setFieldValue('email', event.currentTarget.value)
            }
            error={signInForm.errors.email}
            radius="md"
          />
        </Stack>

        <Button type="submit" radius="xl">
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default QuestionsForm;
