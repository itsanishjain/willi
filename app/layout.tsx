import "../globals.css";
import { inter } from "@/app/lib/fonts";
import { Metadata } from "next";
import Progress from "./progress";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s | willi",
    default: "willi",
  },
  description: "willi, you gonna die so let's fix your cryoto",
  metadataBase: new URL("https://willi.com"),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <Progress />
          {children}
        </Providers>
      </body>
    </html>
  );
}
