import { type FormValues,type SignInResponse, type ErrorResponse } from "@/types/signin";
import { type UseFormReturnType } from "@mantine/form";
import router from "next/router";

// Function to handle signin
export async function handleSignIn(values: FormValues, type: string, signInForm: UseFormReturnType<FormValues>) {

  try {
    const response = await fetch(type === 'login' ? '/api/login' : '/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(type === 'login' ? { email: values.email, password: values.password } : { email: values.email, password: values.password, username: values.username }),
    });

    if (!response.ok) {
      const data: ErrorResponse = await response.json() as ErrorResponse;
      throw new Error(data.error);
    }

    const data: SignInResponse = await response.json() as SignInResponse;
   
    await router.push('/'); // Replace with your desired route
      
    } catch (error: unknown) {
      console.error('Error:', (error as Error).message);
      if ((error as Error).message === 'User not found') {
        signInForm.setFieldError('email', 'User not found');
      } else if ((error as Error).message === 'Wrong password') {
        signInForm.setFieldError('password', 'Wrong password');
      } else if ((error as Error).message === 'Username already exists') {
        signInForm.setFieldError('username', 'Username already exists');
      } else if ((error as Error).message === 'Email already in use') {
        signInForm.setFieldError('email', 'Email already in use');
      } else {
        signInForm.setFieldError('email', (error as Error).message);
      }
    }
  };
