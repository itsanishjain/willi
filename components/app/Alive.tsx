"use client";
import React from "react";
import {
  type UseSendUserOperationResult,
  useSendUserOperation,
  useSmartAccountClient,
} from "@account-kit/react";

import willJson from "@/app/abi/Will.json";
import { createWalletClient, encodeFunctionData, encodeDeployData } from "viem";
import { SALT } from "@/app/lib/constants";

const willAbi = willJson.abi;

export default function Alive() {
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
      // optional parameter that will wait for the transaction to be mined before returning
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

    try {
      const encodedWillData = encodeFunctionData({
        abi: willAbi,
        functionName: "alive",
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
        className="bg-green-600 text-white w-40 px-4 py-2 rounded-md"
        onClick={async () => {
          console.log("client account address", client?.account.address);
          buttonPressed();
        }}
        disabled={isSendingUserOperation}
      >
        {isSendingUserOperation ? "Sending..." : "Verify Alive"}
      </button>
      {error && <div>{error.message}</div>}
    </div>
  );
}
