import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({ 
  subsets: ["latin"],
  variable: "--font-fira-code"
});

export const metadata: Metadata = {
  title: "Natural Language Cron Builder",
  description: "Convert plain English scheduling descriptions into valid cron expressions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${firaCode.variable} font-mono antialiased bg-[#0d1117] text-[#c9d1d9] min-h-screen`}>
        {children}
      </body>
    </html>
  );
}