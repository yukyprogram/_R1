import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SwipeStyle - AI Fashion Discovery",
  description:
    "Tinder風UIで服の好みを選別し、AIアバターで試着できるファッションアプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="font-sans">
        <div className="mx-auto max-w-md min-h-screen flex flex-col relative">
          {children}
        </div>
      </body>
    </html>
  );
}
