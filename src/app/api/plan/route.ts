import { NextRequest, NextResponse } from 'next/server';
import { supabaseRoute } from '@/lib/supabaseServer';

export async function POST(req: NextRequest) {
  const supabase = supabaseRoute();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { title } = await req.json();
  const { data, error } = await supabase.from('plans').insert({ user_id: user.id, title }).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ plan: data });
}

export async function PUT(req: NextRequest) {
  const supabase = supabaseRoute();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, content_md, title } = await req.json();
  const { data, error } = await supabase
    .from('plans')
    .update({ content_md, title })
    .eq('id', id)
    .eq('user_id', user.id)
    .select('*')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ plan: data });
}

export async function DELETE(req: NextRequest) {
  const supabase = supabaseRoute();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  const { error } = await supabase
    .from('plans')
    .update({ is_deleted: true })
    .eq('id', id)
    .eq('user_id', user.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}