"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Clock } from "lucide-react";
import Link from "next/link";
import {
  useSignerStatus,
  useLogout,
  useUser,
  useAuthModal,
} from "@account-kit/react";
import { truncateAddress } from "@/app/lib/utils";

const TopNavHeader = () => {
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();
  const user = useUser();
  const { openAuthModal } = useAuthModal();

  return (
    <div className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Brand */}
          <Link href="/">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-semibold">Willi</h1>
            </div>
          </Link>

          {/* Right side - Account & Actions */}
          <div className="flex items-center space-x-4">
            {/* Timer/Clock Icon */}
            <div className="hidden sm:flex items-center">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="ml-2 text-sm text-gray-500">0.00</span>
            </div>

            {/* Account Button */}
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-gray-200" />
              {user?.address ? (
                truncateAddress(user?.address || "")
              ) : (
                <Button onClick={openAuthModal}>Login</Button>
              )}
            </div>

            <Link href="https://rocketship.lemonsqueezy.com/buy/4a01d680-ec31-4d1c-8dd1-66af668b5ce7?checkout[custom][user_id]=${userId}">
              <Button>Subscribe</Button>
            </Link>

            {signerStatus.isInitializing ? (
              "loading..."
            ) : user ? (
              <Button variant="secondary" onClick={() => logout()}>
                Log out
              </Button>
            ) : null}

            {/* Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700"
            >
              <EllipsisVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavHeader;
