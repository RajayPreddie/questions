import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "./signin";

export interface SigninFormProps {
  type: string;
  signInForm: UseFormReturnType<FormValues>;
  onSubmit: (values: FormValues, event: React.FormEvent<HTMLFormElement> | undefined) => void;
  toggle: () => void;
  }