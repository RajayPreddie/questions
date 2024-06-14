export const INITIAL_QUESTIONS_FORM_SETUP = {
  initialValues: {
    category: '',
    question: '',
    purpose: '',
    terms: true,
  },

  validate: {
    question: (val: string) =>
      val.length > 0 ? null : 'Question should include at least 1 character',
    category: (val: string) =>
      val.length > 0 ? null : 'Category should include at least 1 character',
    purpose: (val: string) =>
      val.length > 0 ? null : 'Purpose should include at least 1 character',
  },
};
