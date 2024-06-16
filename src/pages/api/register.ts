import { auth, db } from '@/firebase/firestoreConfig'; // Adjust the import path as necessary
import { type AuthError, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

interface RegisterRequestBody {
  email: string;
  password: string;
  username: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password, username } = req.body as RegisterRequestBody;

  try {
    // Check if username already exists
    const usersCollectionRef = collection(db, 'users');
    const q = query(usersCollectionRef, where('username', '==', username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    if (userCredential?.user) {
      const user = userCredential.user;
      const document = doc(db, 'users', user.uid);
      await setDoc(document, {
        username,
        createdAt: new Date().toISOString(),
      });
      res.status(201).json({ message: 'User registered', user: user });
    }
  } catch (error: unknown) {
    if ((error as AuthError).code === 'auth/email-already-in-use') {
      res.status(400).json({ error: 'Email already in use' });
    } else {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
