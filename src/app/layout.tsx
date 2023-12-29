import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">All Cats</Link>
          <Link href="/cats/new">New Cat</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
