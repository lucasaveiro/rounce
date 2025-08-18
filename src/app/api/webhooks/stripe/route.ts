import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

export const config = { api: { bodyParser: false } } as any; // Next 14 ignores; but keep note

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as any;
      const customerId = session.customer as string;
      const { data } = await stripe.customers.retrieve(customerId);
      const supabase_user_id = (data as any).metadata?.supabase_user_id;
      if (supabase_user_id) {
        await supabaseAdmin.from('profiles').upsert({
          id: supabase_user_id,
          stripe_customer_id: customerId,
          subscription_status: 'active'
        });
      }
      break;
    }
    case 'customer.subscription.updated':
    case 'customer.subscription.created': {
      const sub = event.data.object as any;
      const customerId = sub.customer as string;
      const periodEnd = new Date(sub.current_period_end * 1000).toISOString();
      const status = sub.status as string;
      const { data: prof } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single();
      if (prof) {
        await supabaseAdmin.from('profiles').update({ subscription_status: status, current_period_end: periodEnd }).eq('id', prof.id);
      }
      break;
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as any;
      const customerId = sub.customer as string;
      const { data: prof } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single();
      if (prof) {
        await supabaseAdmin.from('profiles').update({ subscription_status: 'canceled' }).eq('id', prof.id);
      }
      break;
    }
    default:
      // ignore
      break;
  }
  return NextResponse.json({ received: true });
}