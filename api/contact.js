import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_EMAIL || 'sebaspado@gmail.com';

export default async function handler(req, res) {
  console.log('API called, body:', req.body);
  console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, phone } = req.body;

  if (!name || !email || !message) {
    console.log('Missing required fields');
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.log('No API key configured');
    return res.status(500).json({ error: 'RESEND_API_KEY not configured on server' });
  }

  try {
    console.log('Sending email to:', TO_EMAIL);
    const data = await resend.emails.send({
      from: 'Horses & Humans <onboarding@resend.dev>',
      to: TO_EMAIL,
      subject: `New contact from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
    console.log('Email sent successfully:', data);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log('Error sending email:', error.message);
    return res.status(500).json({ error: error.message });
  }
}