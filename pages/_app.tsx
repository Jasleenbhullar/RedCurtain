// src/pages/_app.tsx

import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css'; // This is crucial for Tailwind CSS to load

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
