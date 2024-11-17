"use client";

import { Button } from "@/components/ui/button";
import BeneficiaryList from "@/components/app/BeneficiaryList";
import SubscriptionStatus from "@/components/app/SubscriptionStatus";
import {
  useAuthModal,
  useSignerStatus,
  useUser,
  useLogout,
} from "@account-kit/react";
import { Loader } from "lucide-react";
import { v4 } from "uuid";

import { useEffect } from "react";

import Alive from "@/components/app/Alive";
import CreateWill from "@/components/app/CreateWill";
import SetSmartAccount from "@/components/app/SetSmartAccount";
import SetBeneficiaries from "@/components/app/SetBeneficiaries";
import SetPeriod from "@/components/app/SetPeriod";
import ClaimAccount from "@/components/app/ClaimAccount";
import AccountInfo from "@/components/app/AccountInfo";
import WillInfo from "@/components/app/WillInfo";

import UpdateOwnersToWill from "@/components/app/UpdateOwnersToWill";

export default function Home() {
  const user = useUser();
  const { openAuthModal, isOpen } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
      {signerStatus.isInitializing ? (
        <>Loading...</>
      ) : user ? (
        <div className="flex flex-col gap-2 p-2">
          <p className="text-xl font-bold">Success!</p>
          You're logged in as {user.email ?? "anon"}.
          <button
            className="akui-btn akui-btn-primary mt-6"
            onClick={() => logout()}
          >
            Log out
          </button>
          <div>{user.address}</div>
          <CreateWill></CreateWill>
          <UpdateOwnersToWill></UpdateOwnersToWill>
          <SetBeneficiaries></SetBeneficiaries>
          <SetSmartAccount />
          <Alive></Alive>
          <SetPeriod></SetPeriod>
          <ClaimAccount></ClaimAccount>
          <AccountInfo />
          <WillInfo />
        </div>
      ) : (
        <button className="akui-btn akui-btn-primary" onClick={openAuthModal}>
          Login
        </button>
      )}
    </main>
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
          <Button onClick={openAuthModal}>Login</Button>
        </main>
      )}
    </>
  );
}
