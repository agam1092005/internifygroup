import { db } from '../../../firebase.js';
import { doc, updateDoc, arrayUnion, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, courseId, orderId, amount, status, courseName } = body;
    if (!userId || !courseId || !orderId || !amount || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

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

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 