"use client";

import BeneficiaryList from "@/components/app/BeneficiaryList";
import SubscriptionStatus from "@/components/app/SubscriptionStatus";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";
import { useAuthenticate } from "@account-kit/react";

import { Loader } from "lucide-react";

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  const { authenticate, authenticateAsync, isPending, error } = useAuthenticate(
    {
      // these are optional
      onSuccess: () => {
        // do something on success
        console.log("successfully logged IN");
      },
      onError: (error) => console.error(error),
    }
  );

  return (
    <>
      {signerStatus.isInitializing ? (
        <Loader className="animate-spin w-6 h-6" />
      ) : user ? (
        <div className="flex flex-col gap-2 p-2">
          <SubscriptionStatus />
          <BeneficiaryList />
        </div>
      ) : (
        <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
          <button className="akui-btn akui-btn-primary" onClick={openAuthModal}>
            Login
          </button>
        </main>
      )}
    </>
  );
}
