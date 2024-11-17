"use client";

import { useAuthModal, useSignerStatus, useUser } from "@account-kit/react";
import AuthWrapper from "@/components/app/AuthWrapper";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { openAuthModal } = useAuthModal();
  return (
    <AuthWrapper>
      <div>Hello world</div>
      <Button onClick={openAuthModal}>Login</Button>
    </AuthWrapper>
  );
}
