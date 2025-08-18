import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseRoute } from '@/lib/supabaseServer';

export async function POST(req: NextRequest) {
  const supabase = supabaseRoute();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const priceId = process.env['NEXT_PUBLIC_STRIPE_PRICE_PRO']!;
  const baseUrl = process.env['NEXT_PUBLIC_APP_URL']!;

  // Ensure profile has stripe_customer_id
  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id, email')
    .eq('id', user.id)
    .single();

  let customerId = profile?.stripe_customer_id || undefined;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: profile?.email || user.email,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;
    await supabase.from('profiles').upsert({ id: user.id, stripe_customer_id: customerId, email: user.email });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/dashboard?sub=success`,
    cancel_url: `${baseUrl}/dashboard?sub=cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
