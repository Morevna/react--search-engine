import { Link } from "@/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import "../../globals.css";

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
          <nav
            style={{
              display: "flex",
              gap: "20px",
              padding: "20px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <Link href="/">Main</Link>
            <Link href="/about">About Us</Link>
          </nav>

          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
