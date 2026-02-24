import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Supabase bazasiga oddiy so'rov yuboramiz. Bunday so'rov bazani faolligini bildiradi va uni uxlab qolishidan (pause) asraydi.
    const { data, error } = await supabase
      .from('page_views')
      .select('id')
      .limit(1)

    if (error) {
      console.error('Keep-alive error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Supabase is alive and active!',
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
