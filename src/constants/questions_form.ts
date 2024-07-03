export const INITIAL_QUESTIONS_FORM_SETUP = {
  initialValues: {
    categories: [] as string[],
    question: '',
    purpose: '',
    terms: true,
  },

  validate: {
    question: (val: string) =>
      val.length > 0 ? null : 'Question should include at least 1 character',
    categories: (val: string[]) =>
      val.length > 0 ? null : 'Category should include at least 1 character',
    purpose: (val: string) =>
      val.length > 0 ? null : 'Purpose should include at least 1 character',
  },
};
