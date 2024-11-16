"use client";

import AddBeneficiaryForm from "@/components/app/AddBeneficiaryForm";
import { Button } from "@/components/ui/button";

import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";

import { Loader } from "lucide-react";

export default function Home() {
  const user = useUser();
  const { openAuthModal, isOpen, closeAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  return (
    <>
      {signerStatus.isInitializing ? (
        <Loader className="animate-spin w-6 h-6" />
      ) : user ? (
        <div className="flex flex-col gap-2 p-2">
          <AddBeneficiaryForm />
        </div>
      ) : (
        <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
          <Button onClick={openAuthModal}>Login</Button>
        </main>
      )}
    </>
  );
}
