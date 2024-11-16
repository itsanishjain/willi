"use client";

import BeneficiaryList from "@/components/app/BeneficiaryList";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";

import Alive from "@/components/app/Alive";
import CreateWill from "@/components/app/CreateWill";
import SetBeneficiaries from "@/components/app/SetBeneficiaries";
import SetPeriod from "@/components/app/SetPeriod";
import ClaimAccount from "@/components/app/ClaimAccount";

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
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
          <SetBeneficiaries></SetBeneficiaries>
          <Alive></Alive>
          <SetPeriod></SetPeriod>
          <ClaimAccount></ClaimAccount>
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
      <BeneficiaryList />
    </>
  );
}
