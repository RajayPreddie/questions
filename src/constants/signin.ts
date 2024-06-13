//signin.ts
// https://medium.com/@austinpaley32/how-to-add-a-constants-file-to-your-react-project-6ce31c015774
export const INITIAL_FORM_SETUP = {
  initialValues: {
    email: '',
    username: '',
    password: '',
    terms: true,
  },

  validate: {
    email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    password: (val: string) =>
      val.length > 6 ? null : 'Password should include at least 6 characters',
  },
};
