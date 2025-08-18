import PlanEditor from '@/components/PlanEditor';
import ExportButton from '@/components/ExportButton';
import { supabaseServer } from '@/lib/supabaseServer';

export default async function PlanPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return <div>Please sign in.</div>;
  const { data: plan } = await supabase
    .from('plans')
    .select('*')
    .eq('id', planId)
    .eq('user_id', user.id)
    .single();
  async function save(md: string) {
    'use server';
    const { cookies } = await import('next/headers');
    const { createRouteHandlerClient } = await import('@supabase/auth-helpers-nextjs');
    const supa = createRouteHandlerClient({ cookies });
    await supa
      .from('plans')
      .update({ content_md: md })
      .eq('id', planId)
      .eq('user_id', user!.id);
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Edit: {plan?.title}</h2>
        <ExportButton selector=".prose" planId={planId} />
      </div>
      {/* PlanEditor uses client-side save via API; here we pass a server action fallback */}
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
}
