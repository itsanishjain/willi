import "../globals.css";
import { inter } from "@/app/lib/fonts";
import { Metadata } from "next";
import Progress from "./progress";
import { Providers } from "./providers";
import { headers } from "next/headers";
import { config } from "@/app/lib/config";
import { cookieToInitialState } from "@account-kit/core";
import { Toaster } from "@/components/ui/toaster";

import SideNav from "@/components/app/SideNav";
import TopNavHeader from "@/components/app/TopNavHeader";

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
  // This will allow us to persist state across page boundaries (read more here: https://accountkit.alchemy.com/react/ssr#persisting-the-account-state)
  const initialState = cookieToInitialState(
    config,
    headers().get("cookie") ?? undefined
  );

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers initialState={initialState}>
          <Progress />
          <div className="flex h-screen flex-col">
            {/* Top Navigation */}
            <TopNavHeader />
            <div className="flex flex-1 overflow-hidden">
              {/* Side Navigation */}
              {/* <aside className="w-24 border-r-2 flex flex-col items-center py-32 space-y-6">
                <SideNav />
              </aside> */}
              {/* Main Content Area */}
              <main className="flex-1 overflow-y-auto bg-white">
                <div className="">{children}</div>
              </main>
            </div>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
