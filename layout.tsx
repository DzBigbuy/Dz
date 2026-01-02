import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
import { FirebaseClientProvider } from "@/firebase";
import { UserAuthNav } from "@/components/user-auth-nav";

export const metadata: Metadata = {
  title: "DzBigBuy",
  description: "منصة الوساطة الرائدة بين التجار والمسوقين",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Caveat:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-foreground antialiased min-h-screen flex flex-col">
        <FirebaseClientProvider>
          <Header />
          <UserAuthNav />
          <main className="flex-grow py-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}

    