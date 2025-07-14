import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { amount, email, phone, userId } = await req.json();

    // Use server-side env vars (never expose secret to frontend)
    const appId = process.env.NEXT_PUBLIC_CASHFREE_APP_ID;
    const secret = process.env.NEXT_PUBLIC_CASHFREE_SECRET;

    if (!appId || !secret) {
      return NextResponse.json({ error: 'Cashfree credentials not set' }, { status: 500 });
    }

    // Use dummy data if not provided, but ready for real use
    const customer_id = userId || email || 'dummy_user';
    const customer_email = email || 'dummy@example.com';
    const customer_phone = phone || '9999999999';

    // Create order with Cashfree API
    const response = await fetch('https://api.cashfree.com/pg/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': appId,
        'x-client-secret': secret,
        'x-api-version': '2022-09-01',
      },
      body: JSON.stringify({
        order_amount: amount,
        order_currency: 'INR',
        customer_details: {
          customer_id,
          customer_email,
          customer_phone,
        },
        order_meta: {
          return_url: 'https://yourdomain.com/payment-success', // update as needed
        },
      }),
    });

    const data = await response.json();

    if (!data.payment_session_id) {
      return NextResponse.json({ error: data.message || 'Failed to create order' }, { status: 500 });
    }

    return NextResponse.json({
      sessionToken: data.payment_session_id,
      orderId: data.order_id,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
} 