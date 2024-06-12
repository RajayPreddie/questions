import type { NextApiRequest, NextApiResponse } from 'next';
import { type AuthError, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firestoreConfig'; // Adjust the import path as necessary

interface RegisterRequestBody {
  email: string;
  password: string;
  username: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

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
    console.error('Error during sign up:', error);
    if ((error as AuthError).code === 'auth/email-already-in-use') {
      res.status(400).json({ error: 'Email already in use' });
    } else {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
