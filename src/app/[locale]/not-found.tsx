'use client';

import Error from 'next/error';

// This page renders when a route is requested that doesn't match the
// middleware and therefore doesn't have a locale associated with it.

export default function NotFound(props: {
  error: Error & { digest?: string };
  params: { locale: string };
}) {
  return (
    <html lang={props.params?.locale}>
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  );
}
