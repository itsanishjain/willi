"use client";
import React from "react";
import {
  type UseSendUserOperationResult,
  useSendUserOperation,
  useSmartAccountClient,
} from "@account-kit/react";
import { abi as multiOwnerLightAccountAbi } from "@/app/abi/MultiOwnerLightAccount.json";
import { abi as willFactoryAbi } from "@/app/abi/WillFactory.json";

import { bytecode, abi as willAbi } from "@/app/abi/Will.json";
import { SALT } from "@/app/lib/constants";
import { encodeFunctionData } from "viem";
import { useWillStore } from "@/app/store/willStore";

export default function ClaimAccount() {
  const { client } = useSmartAccountClient({
    type: "MultiOwnerLightAccount",
    policyId: process.env.NEXT_PUBLIC_POLICY_ID!,
    accountParams: {
      salt: BigInt(SALT),
    },
  });

  const { getWillAddress } = useWillStore();
  const willAddress = client?.account.address
    ? getWillAddress(client.account.address)
    : null;

  const { sendUserOperation, isSendingUserOperation, error } =
    useSendUserOperation({
      client,
      waitForTxn: true,
      onSuccess: ({ hash, request }) => {
        console.log("hash", hash);
        console.log("request", request);
      },
      onError: (error) => {
        console.error(error);
      },
    });

  const buttonPressed = async () => {
    if (!client?.account.address) {
      console.error("Smart account client not initialized");
      return;
    }

    if (!willAddress) {
      console.error("No Will contract address found");
      return;
    }

    try {
      const encodedWillData = encodeFunctionData({
        abi: willAbi,
        functionName: "claimAccount",
        args: [],
      });

      sendUserOperation({
        uo: {
          target: willAddress as `0x${string}`,
          data: encodedWillData,
          value: BigInt(0),
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button
        className="bg-red-500 text-white w-40 px-4 py-2 rounded-md"
        onClick={async () => {
          buttonPressed();
        }}
        disabled={isSendingUserOperation || !willAddress}
      >
        {isSendingUserOperation ? "Sending..." : "Claim Account"}
      </button>
      {error && <div>{error.message}</div>}
    </div>
  );
}
