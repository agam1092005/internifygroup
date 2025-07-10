import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../firebase';
import { doc, updateDoc, arrayUnion, collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, courseId, orderId, amount, status, courseName } = req.body;
  if (!userId || !courseId || !orderId || !amount || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Add courseId to user's purchasedCourses
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      purchasedCourses: arrayUnion(courseId),
    });

    // Add transaction document
    const transactionsRef = collection(db, 'transactions');
    await addDoc(transactionsRef, {
      userId,
      courseId,
      courseName: courseName || courseId,
      orderId,
      amount,
      status,
      timestamp: serverTimestamp(),
    });

    return res.status(200).json({ success: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    return res.status(500).json({ error: errorMessage });
  }
} 