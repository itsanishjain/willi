"use client";
import React from "react";
import {
  type UseSendUserOperationResult,
  useSendUserOperation,
  useSmartAccountClient,
} from "@account-kit/react";

import { abi as willAbi } from "@/app/abi/Will.json";
import { encodeFunctionData } from "viem";
import { SALT } from "@/app/lib/constants";
export default function SetPeriod() {
  const { client } = useSmartAccountClient({
    type: "MultiOwnerLightAccount",
    policyId: process.env.NEXT_PUBLIC_POLICY_ID!,
    accountParams: {
      salt: BigInt(SALT),
    },
  });

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
    // if (!client?.account.address) return;
    // Parameters to edit
    const period = 1;
    const deployedWillContractAddress =
      "0xEE754604204B1EE4eD7365a74ac7a8AFDD9c8078";
    try {
      const encodedWillData = encodeFunctionData({
        abi: willAbi,
        functionName: "setPeriod",
        args: [period],
      });

      sendUserOperation({
        uo: {
          target: deployedWillContractAddress,
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
        className="bg-amber-700 text-white w-40 px-4 py-2 rounded-md"
        onClick={async () => {
          buttonPressed();
        }}
        disabled={isSendingUserOperation}
      >
        {isSendingUserOperation ? "Sending..." : "Set Period"}
      </button>
      {error && <div>{error.message}</div>}
    </div>
  );
}
