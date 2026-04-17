import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig(event)

  // Server-side validation (T-03-01)
  const { name, email, message } = body
  if (!name || typeof name !== 'string' || name.length < 2 || name.length > 100) {
    throw createError({ statusCode: 400, message: 'Invalid name' })
  }
  if (!email || typeof email !== 'string' || !email.includes('@') || email.length > 200) {
    throw createError({ statusCode: 400, message: 'Invalid email' })
  }
  if (!message || typeof message !== 'string' || message.length < 10 || message.length > 5000) {
    throw createError({ statusCode: 400, message: 'Invalid message' })
  }

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: 465,
    secure: true,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  })

  // Escape HTML to prevent XSS in email body (T-03-02)
  const escapedName = name.replace(/[&<>"']/g, (c: string) => {
    const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
    return map[c] ?? c
  })
  const escapedMessage = message.replace(/[&<>"']/g, (c: string) => {
    const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
    return map[c] ?? c
  })

  const escapedEmail = email.replace(/[&<>"']/g, (c: string) => {
    const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
    return map[c] ?? c
  })

  const dateStr = new Date().toLocaleString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
    timeZone: 'Europe/Paris',
  })

  const html = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#030712;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#030712;padding:40px 16px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
  <tr><td style="padding:32px 40px 24px;background-color:#0a0f1a;border-radius:16px 16px 0 0;border-bottom:1px solid #1f2937;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td><span style="font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.025em;">Killian' DAL-CIN</span></td>
      <td align="right">
        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background-color:#85cb85;margin-right:6px;vertical-align:middle;"></span>
        <span style="font-size:12px;font-family:'Courier New',monospace;color:#85cb85;letter-spacing:0.05em;text-transform:uppercase;">New Message</span>
      </td>
    </tr>
    </table>
  </td></tr>
  <tr><td style="padding:0;background-color:#0a0f1a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding:28px 40px 20px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#111827;border-radius:12px;border:1px solid #1f2937;">
        <tr><td style="padding:10px 16px;border-bottom:1px solid #1f2937;">
          <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#ef4444;margin-right:6px;opacity:0.7;"></span>
          <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#eab308;margin-right:6px;opacity:0.7;"></span>
          <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#22c55e;opacity:0.7;"></span>
          <span style="font-family:'Courier New',monospace;font-size:11px;color:#6b7280;margin-left:12px;">contact@portfolio</span>
        </td></tr>
        <tr><td style="padding:20px;">
          <div style="font-family:'Courier New',monospace;font-size:13px;line-height:2;color:#9ca3af;">
            <span style="color:#85cb85;">$</span> <span style="color:#6b7280;">from:</span> <span style="color:#ffffff;font-weight:600;">${escapedName}</span><br>
            <span style="color:#85cb85;">$</span> <span style="color:#6b7280;">email:</span> <a href="mailto:${escapedEmail}" style="color:#85cb85;text-decoration:none;">${escapedEmail}</a><br>
            <span style="color:#85cb85;">$</span> <span style="color:#6b7280;">date:</span> <span style="color:#d1d5db;">${dateStr}</span>
          </div>
        </td></tr>
      </table>
    </td></tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding:0 40px;"><div style="height:1px;background:linear-gradient(to right,transparent,#1f2937,#3f8c3f,#1f2937,transparent);"></div></td></tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding:28px 40px 36px;">
      <p style="margin:0 0 12px;font-family:'Courier New',monospace;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
      <div style="font-size:15px;line-height:1.7;color:#e5e7eb;">${escapedMessage.replace(/\n/g, '<br>')}</div>
    </td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:20px 40px 28px;background-color:#0a0f1a;border-radius:0 0 16px 16px;border-top:1px solid #1f2937;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td><span style="font-size:12px;color:#4b5563;">killiandalcin.fr</span></td>
      <td align="right"><span style="font-size:11px;font-family:'Courier New',monospace;color:#374151;">Built with Nuxt</span></td>
    </tr>
    </table>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`

  await transporter.sendMail({
    from: `"Portfolio Killian'" <${config.smtpUser}>`,
    to: config.smtpTo,
    replyTo: email,
    subject: `Nouveau message — ${name}`,
    text: `De: ${name} <${email}>\n\n${message}`,
    html,
  })

  return { success: true }
})
