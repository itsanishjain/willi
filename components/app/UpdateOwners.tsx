"use client";
import React from "react";
import {
  type UseSendUserOperationResult,
  useSendUserOperation,
  useSmartAccountClient,
} from "@account-kit/react";
import { abi as multiOwnerLightAccountAbi } from "@/app/abi/MultiOwnerLightAccount.json";
import { abi as willFactoryAbi } from "@/app/abi/WillFactory.json";

import { createWalletClient, http, encodeFunctionData } from "viem";

export default function MyOpSenderComponent() {
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

  const encodedTransferOwnership = encodeFunctionData({
    abi: multiOwnerLightAccountAbi,
    functionName: "updateOwners",
    args: [["0xF7594E70B730FB96fE2EE41611dce7Ee45c3ffEA"], []],
  });

  return (
    <div>
      <button
        className="bg-blue-600 text-white w-40"
        onClick={async () => {
          console.log("client account address", client?.account.address);
        }}
        disabled={isSendingUserOperation}
      >
        {isSendingUserOperation ? "Sending..." : "Send UO"}
      </button>
      {error && <div>{error.message}</div>}
    </div>
  );
}
