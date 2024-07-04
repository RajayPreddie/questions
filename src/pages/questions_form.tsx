import CategoriesScroll from '@/components/scroll/categoriesScroll';
import * as constants from '@/constants/questions_form';
import { Button, Paper, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useToggle } from '@mantine/hooks';
import React from 'react';
const categories = [
  'General Knowledge',
  'History',
  'Geography',
  'Science',
  'Literature',
  'Art',
  'Technology',
  'Software Development',
  'Hardware',
  'Internet & Networking',
  'Artificial Intelligence',
  'Cybersecurity',
  'Entertainment',
  'Movies',
  'Music',
  'Television Shows',
  'Video Games',
  'Celebrities',
  'Sports',
  'Football (Soccer)',
  'Basketball',
  'Baseball',
  'Tennis',
  'Olympic Games',
  'Education',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Languages',
  'Health and Fitness',
  'Nutrition',
  'Exercise',
  'Mental Health',
  'Diseases and Conditions',
  'Medical Treatments',
  'Business and Finance',
  'Economics',
  'Investment',
  'Entrepreneurship',
  'Marketing',
  'Management',
  'Lifestyle',
  'Travel',
  'Food and Drink',
  'Fashion',
  'Home and Garden',
  'Relationships',
  'Society and Culture',
  'Politics',
  'Religion',
  'Philosophy',
  'Sociology',
  'Traditions',
  'Science and Nature',
];

// TODO: add logic for
// TODO: Use a toggle to decide between creating a new category or selecting an existing category
// TODO: if the user selects create category, show a text input to create a new category, but also have the option to select two existing categories
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
          <CategoriesScroll
            categories={categories}
            selectedCategories={signInForm.values.categories}
            setSelectedCategories={(categories: string[]) =>
              signInForm.setFieldValue('categories', categories)
            }
          />
          <TextInput
            label="Question"
            placeholder="Your question"
            value={signInForm.values.question}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
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
