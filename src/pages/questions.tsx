import { Button } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';

// TODO: Button to add a question
// FORM: Question, Category, Purpose, Private. Submit Button
// Database: Save the question and category
// On the page, display the question categories. Then when clicking the category, show the questions in that category
// questions can be a subcollection for the user
// categories should be a subcollection
//  questions should be subcollection
// Have a subcollection that then links the questions subcollection and the categories subcollection

// Better idea for the UI
// Search bar to search for questions and a categories dropdown as a part of the search bar
const Questions = () => {
  const router = useRouter();
  // Navigate to the questions form page
  const handleQuestionsButtonClick = async () => {
    await router.push('/questions_form');
  };
  return (
    <div>
      <Button onClick={handleQuestionsButtonClick}> Add Questions</Button>
    </div>
  );
};

// eslint-disable-next-line import/no-unused-modules
export default Questions;
