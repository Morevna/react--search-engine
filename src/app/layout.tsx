import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav
          style={{
            display: "flex",
            gap: "20px",
            padding: "20px",
          }}
        >
          <Link href="/">Main</Link>

          <Link href="/about">About Us</Link>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}
