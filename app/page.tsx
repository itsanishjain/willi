"use client";

import TopNavHeader from "@/components/app/TopNavHeader";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  // return (
  //   <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
  //     {signerStatus.isInitializing ? (
  //       <>Loading...</>
  //     ) : user ? (
  //       <div className="flex flex-col gap-2 p-2">
  //         <p className="text-xl font-bold">Success!</p>
  //         You're logged in as {user.email ?? "anon"}.
  //         <button
  //           className="akui-btn akui-btn-primary mt-6"
  //           onClick={() => logout()}
  //         >
  //           Log out
  //         </button>
  //       </div>
  //     ) : (
  //       <button className="akui-btn akui-btn-primary" onClick={openAuthModal}>
  //         Login
  //       </button>
  //     )}
  //   </main>
  // );

  return (
    <div className="flex h-screen flex-col">
      {/* Top Navigation */}
      <TopNavHeader />
      <div className="flex flex-1 overflow-hidden">
        {/* Side Navigation */}
        {/* <aside className="w-24 border-r-2 flex flex-col items-center py-32 space-y-6">
        <NavLinks />
      </aside> */}
        {/* Main Content Area */}
        {/* <main className="flex-1 overflow-y-auto bg-white">
        <div className="">{children}</div>
      </main> */}
      </div>
    </div>
  );
}
