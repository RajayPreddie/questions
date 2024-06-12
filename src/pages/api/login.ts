import type { NextApiRequest, NextApiResponse } from 'next';
import { type AuthError, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firestoreConfig'; // Adjust the import path as necessary

interface LoginRequestBody {
  email: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body as LoginRequestBody;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    res.status(200).json({ message: 'User signed in', user: userCredential.user });
  } catch (error: unknown) {
    console.error('Error during sign in:', error);
    if ((error as AuthError).code === 'auth/user-not-found') {
      res.status(404).json({ error: 'User not found' });
    } else if ((error as AuthError).code === 'auth/wrong-password') {
      res.status(401).json({ error: 'Wrong password' });
    } else {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
