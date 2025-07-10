import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid userId' });
  }
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      return res.status(404).json({ error: 'User not found' });
    }
    const data = userSnap.data();
    return res.status(200).json({ purchasedCourses: data.purchasedCourses || [] });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    return res.status(500).json({ error: errorMessage });
  }
} 