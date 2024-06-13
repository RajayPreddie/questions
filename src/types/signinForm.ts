import { type FormValues } from './signin';
import { type UseFormReturnType } from '@mantine/form';

export interface SigninFormProps {
  type: string;
  signInForm: UseFormReturnType<FormValues>;
  onSubmit: (
    values: FormValues,
    event: React.FormEvent<HTMLFormElement> | undefined,
  ) => void;
  toggle: () => void;
}
