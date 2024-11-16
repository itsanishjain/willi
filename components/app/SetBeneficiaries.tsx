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
import { sepolia } from "viem/chains";
import {
  createWalletClient,
  http,
  encodeFunctionData,
  parseAbi,
  encodeDeployData,
  zeroAddress,
  Address,
} from "viem";
export default function SetBeneficiaries() {
  const { client } = useSmartAccountClient({
    type: "MultiOwnerLightAccount",
    policyId: process.env.NEXT_PUBLIC_POLICY_ID!,
    accountParams: {
      salt: BigInt(0),
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
    if (!client?.account.address) return;

    try {
      const encodedWillData = encodeFunctionData({
        abi: willAbi,
        functionName: "setBeneficiaries",
        args: [],
      });

      sendUserOperation({
        uo: {
          target: "0xEE754604204B1EE4eD7365a74ac7a8AFDD9c8078",
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
        className="bg-slate-700 text-white w-40 px-4 py-2 rounded-md"
        onClick={async () => {
          buttonPressed();
        }}
        disabled={isSendingUserOperation}
      >
        {isSendingUserOperation ? "Sending..." : "Set Beneficiaries"}
      </button>
      {error && <div>{error.message}</div>}
    </div>
  );
}
