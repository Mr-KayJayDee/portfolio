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

  await transporter.sendMail({
    from: `"Portfolio" <${config.smtpUser}>`,
    to: config.smtpTo,
    subject: `Contact portfolio - ${name}`,
    text: `De: ${name} <${email}>\n\n${message}`,
    html: `<p><strong>De:</strong> ${escapedName} &lt;${email}&gt;</p><p>${escapedMessage.replace(/\n/g, '<br>')}</p>`,
  })

  return { success: true }
})
