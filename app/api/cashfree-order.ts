import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, userId, courseId, courseName } = req.body;
  if (!amount || !userId || !courseId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
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
          customer_email: req.body.email || 'test@example.com',
          customer_phone: req.body.phone || '9999999999',
        },
        order_id: `${userId}_${courseId}_${Date.now()}`,
        order_note: courseName || courseId,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      return res.status(500).json({ error: data.message || 'Failed to create order' });
    }
    return res.status(200).json({ sessionToken: data.payment_session_id, orderId: data.order_id });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
} 