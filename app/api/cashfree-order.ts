import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, userId, courseId, courseName, email, phone } = body;
    if (!amount || !userId || !courseId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Call Cashfree API to create order and get session token
    const response = await fetch('https://sandbox.cashfree.com/pg/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': process.env.NEXT_PUBLIC_CASHFREE_APP_ID!,
        'x-client-secret': process.env.NEXT_PUBLIC_CASHFREE_SECRET!,
      },
      body: JSON.stringify({
        order_amount: amount,
        order_currency: 'INR',
        customer_details: {
          customer_id: userId,
          customer_email: email || 'test@example.com',
          customer_phone: phone || '9999999999',
        },
        order_id: `${userId}_${courseId}_${Date.now()}`,
        order_note: courseName || courseId,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Failed to create order' }, { status: 500 });
    }

    // Store transaction in Firestore with status 'PENDING'
    const transactionsRef = collection(db, 'transactions');
    await addDoc(transactionsRef, {
      userId,
      courseId,
      courseName: courseName || courseId,
      orderId: data.order_id,
      amount,
      status: 'PENDING',
      timestamp: serverTimestamp(),
    });

    return NextResponse.json({ sessionToken: data.payment_session_id, orderId: data.order_id });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 