import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const { restaurantId, amount } = await request.json();

    if (!restaurantId || !amount) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder';

    // If using dummy placeholder keys during localhost prototyping, return simulated order response
    if (keyId === 'rzp_test_placeholder' || keyId.includes('YourKeyHere')) {
      return NextResponse.json({
        order: {
          id: `order_${Math.random().toString(36).substring(2, 11)}`,
          entity: 'order',
          amount: amount * 100,
          currency: 'INR',
          status: 'created',
        },
      });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100, // INR in paise
      currency: 'INR',
      receipt: `receipt_${restaurantId}`,
      notes: {
        restaurantId,
      },
    });

    return NextResponse.json({ order });
  } catch (error: any) {
    console.error('Razorpay order creation failed:', error);
    return NextResponse.json({ error: error.message || 'Payment initiation failed' }, { status: 500 });
  }
}
