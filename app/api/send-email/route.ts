import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    console.log('Received form data:', body);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,       // your verified email
      to: process.env.EMAIL_FROM,         // your email to receive contact form messages
      subject: 'New Contact Us Message',
      replyTo: email,                     // user's email for reply
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
