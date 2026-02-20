import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { name, phone, model } = await request.json()

    // 1. Save to Supabase
    const { error: supabaseError } = await supabase
      .from('requests')
      .insert([
        { name, phone, model, status: 'Yangi' }
      ])

    if (supabaseError) {
      console.error('Supabase error:', supabaseError)
      // We continue to telegram even if supabase fails, or you can return error here
    }

    // 2. Telegram Notification
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      console.error('Telegram configuration missing')
      return NextResponse.json({ error: 'Telegram configuration missing' }, { status: 500 })
    }

    const message = `
🔔 *Yangi ariza!*
👤 *Ism:* ${name}
📞 *Tel:* +998${phone}
🚗 *Model:* ${model}
    `

    const url = `https://api.telegram.org/bot${token}/sendMessage`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
