"use client";

import { useAuthModal, useSignerStatus, useUser } from "@account-kit/react";
import AuthWrapper from "@/components/app/AuthWrapper";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  if (signerStatus.isInitializing && user) {
    return <Loader className="animate-spin w-6 h-6" />;
  }

  return (
    <AuthWrapper>
      <div>Hello world</div>
      <Button onClick={openAuthModal}>Login</Button>
    </AuthWrapper>
  );
}
