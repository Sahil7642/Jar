import './globals.css';

export const metadata = {
  title: 'The Online Geeta Jar',
  description: 'Draw wisdom from the Bhagavad Gita for what your heart seeks today.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-amber-50 text-stone-800 min-h-screen flex flex-col items-center justify-between p-4 md:p-8">
        {children}
      </body>
    </html>
  );
}