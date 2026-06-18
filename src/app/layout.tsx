import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans, Satisfy } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const satisfy = Satisfy({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Durga Prasad D | Biotechnology Student Research Portfolio",
  description: "Academic and research portfolio of Durga Prasad D, a Biotechnology student at Amity University seeking advancements in biotechnology and research.",
  keywords: [
    "Biotechnology",
    "Amity University",
    "Molecular Biology",
    "Genetics",
    "Research Portfolio",
    "Durga Prasad D",
    "Framer Motion Portfolio",
    "Next.js Portfolio",
  ],
  authors: [{ name: "Durga Prasad D" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${satisfy.variable} dark`}
      style={{ colorScheme: "dark" }}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="font-body min-h-screen relative antialiased selection:bg-cyan-glow/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
