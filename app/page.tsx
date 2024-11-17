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
      <div className="flex flex-col items-center w-full h-full relative">
        <div className="w-full">
          <img 
            src="/willihome.svg"
            alt="Logo"
            className="w-full h-auto" 
            style={{ display: 'block' }}
          />
        </div>
        <Button 
          onClick={openAuthModal} 
          className="absolute"
          style={{ 
            color: 'white',
            backgroundColor: '#000000',
            borderRadius: '42px',
            top: '14%',
            fontSize: '18px',
            fontWeight: '400',
            padding: '24px 28px',
            transform: 'translateY(-50%)', // Centers the button vertically at its position
            zIndex: 10 // Ensures button stays on top
          }}
        >
          Create Will
        </Button>
      </div>
    </AuthWrapper>
  );
}
