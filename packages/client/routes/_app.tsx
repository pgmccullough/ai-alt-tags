import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
        <title>AI Alt Tags | Effortless Accessibility</title>
        <link rel="stylesheet" href="/styles/styles.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
