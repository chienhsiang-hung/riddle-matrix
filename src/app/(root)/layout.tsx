import { ReactNode } from 'react';

export default function RedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Riddle Temple</title>
      </head>
      <body>{children}</body>
    </html>
  );
}