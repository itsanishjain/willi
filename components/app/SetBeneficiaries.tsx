"use client";
import React from "react";
import {
  type UseSendUserOperationResult,
  useSendUserOperation,
  useSmartAccountClient,
} from "@account-kit/react";

import willJson from "@/app/abi/Will.json";

import { encodeFunctionData, Address } from "viem";
import { SALT } from "@/app/lib/constants";

const willAbi = willJson.abi;

export default function SetBeneficiaries() {
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
    const beneficiaries: Address[] = [
      "0x5C8aD0AA7Bd48f0D0EB0FAE8fDb01b83Fcaa8f89",
    ];
    const deployedWillContractAddress =
      "0xEE754604204B1EE4eD7365a74ac7a8AFDD9c8078";

    try {
      const encodedWillData = encodeFunctionData({
        abi: willAbi,
        functionName: "setBeneficiaries",
        args: [beneficiaries],
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
