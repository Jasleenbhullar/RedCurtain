'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onFormSubmitted = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, message }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      alert('✅ Email sent successfully!');
    } else {
      alert('❌ Failed to send email: ' + data.error);
    }
  };

  return (
    <form onSubmit={onFormSubmitted} className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
      <input
        type="text"
        placeholder="Your Name"
        className="flex-1 p-2 rounded-md bg-gray-800 text-white"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="you@example.com"
        className="flex-1 p-2 rounded-md bg-gray-800 text-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Phone Number"
        className="flex-1 p-2 rounded-md bg-gray-800 text-white"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <textarea
        placeholder="Your Query"
        className="w-full p-2 rounded-md bg-gray-800 text-white"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        required
      ></textarea>
      <button
        type="submit"
        className="bg-blue-700 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-md disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
