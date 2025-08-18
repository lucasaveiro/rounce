import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import type Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const customer = await stripe.customers.retrieve(session.customer as string);
        const supabase_user_id =
          (customer as Stripe.Customer).metadata?.supabase_user_id as string | undefined;
        if (supabase_user_id) {
          await supabaseAdmin.from('profiles').upsert({
          id: supabase_user_id,
          stripe_customer_id: session.customer as string,
          subscription_status: 'active'
        });
        }
        break;
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.created': {
        const sub = event.data.object as unknown as {
          customer: string;
          current_period_end: number;
          status: string;
        };
        const customerId = sub.customer;
        const periodEnd = new Date(sub.current_period_end * 1000).toISOString();
        const status = sub.status;
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
        const sub = event.data.object as unknown as {
          customer: string;
          current_period_end: number;
          status?: string;
        };
        const customerId = sub.customer;
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
