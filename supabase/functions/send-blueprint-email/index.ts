import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2?target=deno'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { userEmail, brandName, industry, demandScore, competitionLevel, tagline } = await req.json()

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY not set')

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Your Brand Blueprint is Ready</title>
</head>
<body style="margin:0;padding:0;background:#050505;font-family:helvetica,arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#0a0a0a;border:1px solid #1a1a1a;border-radius:16px;overflow:hidden;">

          <!-- Orange top bar -->
          <tr><td style="height:3px;background:#ff6400;"></td></tr>

          <!-- Header -->
          <tr>
            <td style="padding:32px 36px 0;">
              <p style="margin:0;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:3px;">FORGE AI</p>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td style="padding:28px 36px 24px;">
              <h1 style="margin:0 0 8px;color:#ffffff;font-size:28px;font-weight:700;line-height:1.2;">
                Your brand blueprint<br>is ready. ⚡
              </h1>
              <p style="margin:0;color:#666;font-size:14px;">
                All five engines have finished running for <strong style="color:#ff6400;">${brandName}</strong>.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:0 36px;"><hr style="border:none;border-top:1px solid #1a1a1a;"></td></tr>

          <!-- Stats -->
          <tr>
            <td style="padding:24px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="33%" style="text-align:center;padding:16px;background:#111;border-radius:10px;">
                    <p style="margin:0 0 4px;color:#ff6400;font-size:22px;font-weight:700;">${demandScore ?? '—'}</p>
                    <p style="margin:0;color:#555;font-size:10px;letter-spacing:2px;text-transform:uppercase;">Demand Score</p>
                  </td>
                  <td width="4%"></td>
                  <td width="30%" style="text-align:center;padding:16px;background:#111;border-radius:10px;">
                    <p style="margin:0 0 4px;color:#ffffff;font-size:13px;font-weight:700;">${competitionLevel ?? '—'}</p>
                    <p style="margin:0;color:#555;font-size:10px;letter-spacing:2px;text-transform:uppercase;">Competition</p>
                  </td>
                  <td width="4%"></td>
                  <td width="29%" style="text-align:center;padding:16px;background:#111;border-radius:10px;">
                    <p style="margin:0 0 4px;color:#ffffff;font-size:13px;font-weight:700;">${industry ?? 'Brand'}</p>
                    <p style="margin:0;color:#555;font-size:10px;letter-spacing:2px;text-transform:uppercase;">Industry</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Tagline -->
          ${tagline ? `
          <tr>
            <td style="padding:0 36px 24px;">
              <div style="padding:16px 20px;background:#111;border-left:3px solid #ff6400;border-radius:0 8px 8px 0;">
                <p style="margin:0;color:#aaa;font-size:13px;font-style:italic;">"${tagline}"</p>
                <p style="margin:4px 0 0;color:#555;font-size:10px;letter-spacing:2px;text-transform:uppercase;">AI-generated tagline</p>
              </div>
            </td>
          </tr>` : ''}

          <!-- What's inside -->
          <tr>
            <td style="padding:0 36px 24px;">
              <p style="margin:0 0 12px;color:#555;font-size:10px;letter-spacing:2px;text-transform:uppercase;">What's in your blueprint</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${[
                  ['📡', 'Signal Engine', 'Market demand, competition map, audience heat'],
                  ['🎨', 'Craft Engine', 'Brand identity, colors, voice, product concepts'],
                  ['📣', 'Reach Engine', 'Growth campaigns, ad angles, email sequences'],
                  ['💬', 'Pulse Engine', 'Customer experience, retention, support drafts'],
                  ['💰', 'Capital Engine', 'Launch budget, margins, 30-day projection'],
                ].map(([icon, name, desc]) => `
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #111;">
                    <span style="font-size:16px;">${icon}</span>
                    <strong style="color:#fff;font-size:13px;margin-left:8px;">${name}</strong>
                    <span style="color:#555;font-size:12px;"> — ${desc}</span>
                  </td>
                </tr>`).join('')}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 36px 36px;text-align:center;">
              <a href="https://forge-app.pages.dev/dashboard"
                style="display:inline-block;background:#ff6400;color:#000;font-weight:700;font-size:12px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:10px;">
                View Brand Blueprint →
              </a>
              <p style="margin:16px 0 0;color:#333;font-size:11px;">
                You can also export a PDF brand kit directly from your dashboard.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 36px;border-top:1px solid #111;text-align:center;">
              <p style="margin:0;color:#333;font-size:11px;">FORGE AI · Built for brand builders</p>
              <p style="margin:4px 0 0;color:#222;font-size:10px;">You received this because you ran a brand engine on FORGE.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'FORGE AI <onboarding@resend.dev>',
        to: [userEmail],
        subject: `⚡ Your ${brandName} blueprint is ready`,
        html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Resend error: ${err}`)
    }

    return new Response(JSON.stringify({ sent: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (err: any) {
    console.error('Email error:', err.message)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
