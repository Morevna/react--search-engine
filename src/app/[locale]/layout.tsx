import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Header, { ThemeProvider } from "@/components/Header";
import Flyout from "@/components/Flyout";
import TestErrorButton from "@/components/TestErrorButton";
import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <ErrorBoundary>
              <Header />
              <main>{children}</main>
              <Flyout />
              <TestErrorButton />
            </ErrorBoundary>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}