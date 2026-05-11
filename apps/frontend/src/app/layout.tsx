import './globals.css';

export const metadata = {
  title: 'Spendly',
  description:
    'Smart Finance Tracker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark-theme">
        {children}
      </body>
    </html>
  );
}