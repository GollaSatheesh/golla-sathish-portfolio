import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Gmail SMTP transporter using your verified credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'mailforediting5@gmail.com',
      pass: (process.env.EMAIL_PASS || 'ysdsbtmxmldkzebr').replace(/\s+/g, ''),
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact: ${name}" <${process.env.EMAIL_USER || 'mailforediting5@gmail.com'}>`,
    to: process.env.TO_EMAIL || 'gollasatheesh95@gmail.com',
    replyTo: email,
    subject: `🚀 Portfolio Message from ${name} (${email})`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; padding: 24px; background: #030712; color: #f8fafc; border-radius: 12px; border: 1px solid #1e3a5f;">
        <h2 style="color: #00d2ee; margin-top: 0; font-size: 20px;">New Message from Golla Sathish Portfolio</h2>
        <div style="background: #0b1528; padding: 18px; border-radius: 8px; margin: 16px 0; border: 1px solid #1e3a5f;">
          <p style="margin: 0 0 10px 0;"><strong style="color: #94a3b8;">Sender Name:</strong> ${name}</p>
          <p style="margin: 0 0 10px 0;"><strong style="color: #94a3b8;">Sender Email:</strong> <a href="mailto:${email}" style="color: #00d2ee;">${email}</a></p>
          <p style="margin: 0;"><strong style="color: #94a3b8;">Received At:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
        </div>
        <h3 style="color: #ffffff; font-size: 16px; margin-bottom: 8px;">Message Content:</h3>
        <div style="background: #070e1e; padding: 16px; border-radius: 8px; border-left: 3px solid #00d2ee; font-size: 15px; line-height: 1.6; color: #cbd5e1; white-space: pre-wrap;">${message}</div>
        <p style="font-size: 12px; color: #64748b; margin-top: 24px;">Click 'Reply' directly to respond to ${email}.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email delivered directly to your inbox.' });
  } catch (error) {
    console.error('Vercel serverless email error:', error);
    return res.status(500).json({ error: error.message || 'Failed to send email.' });
  }
}
