import PlanEditor from '@/components/PlanEditor';
import ExportButton from '@/components/ExportButton';
import { supabaseServer } from '@/lib/supabaseServer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export default async function PlanPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;
  const supabase = supabaseServer();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      console.error('[open-plan] failed', {
        planId,
        runtime: process.env.NEXT_RUNTIME,
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      });
      return <div>Please sign in.</div>;
    }

    const { data: plan, error } = await supabase
      .from('plans')
      .select('*')
      .eq('id', planId)
      .eq('user_id', user.id)
      .single();

    if (error || !plan) {
      throw error || new Error('Plan not found');
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Edit: {plan.title}</h2>
          <ExportButton selector=".prose" planId={planId} />
        </div>
        {/* PlanEditor uses client-side save via API */}
        <PlanEditor
          plan={plan}
          onSave={async (md) => {
            await fetch('/api/plan', {
              method: 'PUT',
              body: JSON.stringify({ id: planId, content_md: md }),
            });
          }}
        />
      </div>
    );
  } catch (error) {
    console.error('[open-plan] failed', {
      planId,
      runtime: process.env.NEXT_RUNTIME,
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      error,
    });
    throw error;
  }
}
