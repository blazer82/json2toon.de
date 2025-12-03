import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router';
import { I18nextProvider, useTranslation } from 'react-i18next';

import type { Route } from './+types/root';
import i18n, { getLanguageFromHeader } from '~/i18n';
import './app.css';

export async function loader({ request }: Route.LoaderArgs) {
  const acceptLanguage = request.headers.get('Accept-Language');
  const language = getLanguageFromHeader(acceptLanguage);

  // Set the language on the server-side i18n instance
  if (i18n.language !== language) {
    await i18n.changeLanguage(language);
  }

  return { language };
}

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  // Access loader data if available (won't be available in error boundary)
  let language = 'en';
  try {
    const data = useLoaderData<typeof loader>();
    language = data?.language || 'en';
  } catch {
    // Loader data not available (e.g., in error boundary)
    language = i18n.language || 'en';
  }

  return (
    <html lang={language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { t } = useTranslation('errors');

  let message = t('boundary.oops');
  let details = t('boundary.unexpected');
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? t('boundary.notFound') : 'Error';
    details = error.status === 404 ? t('boundary.pageNotFound') : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
