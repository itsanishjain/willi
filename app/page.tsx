"use client";

import { Button } from "@/components/ui/button";
import BeneficiaryList from "@/components/app/BeneficiaryList";
import SubscriptionStatus from "@/components/app/SubscriptionStatus";
import { useAuthModal, useSignerStatus, useUser } from "@account-kit/react";
import { Loader } from "lucide-react";

import SetBeneficiaries from "@/components/app/SetBeneficiaries";
import SetPeriod from "@/components/app/SetPeriod";
import Alive from "@/components/app/Alive";

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();

  return (
    <>
      {signerStatus.isInitializing ? (
        <Loader className="animate-spin w-6 h-6" />
      ) : user ? (
        <div className="flex flex-col gap-2 p-2">
          <SubscriptionStatus />
          <BeneficiaryList />
          <SetBeneficiaries />
          <Alive />
          <SetPeriod />
        </div>
      ) : (
        <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
          <Button onClick={openAuthModal}>Login</Button>
        </main>
      )}
    </>
  );
}
