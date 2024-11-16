"use client";

import { Button } from "@/components/ui/button";
import BeneficiaryList from "@/components/app/BeneficiaryList";
import SubscriptionStatus from "@/components/app/SubscriptionStatus";
import { useAuthModal, useSignerStatus, useUser } from "@account-kit/react";
import { Loader } from "lucide-react";
import { v4 } from "uuid";

import { useEffect } from "react";

export default function Home() {
  const user = useUser();
  const { openAuthModal, isOpen } = useAuthModal();
  const signerStatus = useSignerStatus();

  const addUser = async (body: any) => {
    fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  useEffect(() => {
    if (user && !isOpen) {
      const uid = v4();
      const body = { email: user.email, walletAddress: user.address, uid: uid };
      addUser(body);
      console.log(body);
    }
  }, [user]);

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
          <Button onClick={openAuthModal}>Login</Button>
        </main>
      )}
    </>
  );
}
