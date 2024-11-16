"use client";

import AddBeneficiaryForm from "@/components/app/AddBeneficiaryForm";
import { Button } from "@/components/ui/button";

import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";
import AuthWrapper from "@/components/app/AuthWrapper";

export default function AddBeneficiaryPage() {
  return (
    <AuthWrapper>
      <AddBeneficiaryForm />
    </AuthWrapper>
  );
}
