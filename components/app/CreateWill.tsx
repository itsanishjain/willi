"use client";
import React from "react";
import {
  type UseSendUserOperationResult,
  useSendUserOperation,
  useSmartAccountClient,
} from "@account-kit/react";
import willFactoryJson from "@/app/abi/WillFactory.json";
const willFactoryAbi = willFactoryJson.abi;

import { encodeFunctionData, parseAbi } from "viem";
import { WILL_FACTORY_CONTRACT_ADDRESS } from "@/app/lib/constants";
import { SALT } from "@/app/lib/constants";

export default function CreateWill() {
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

  const deployContract = async () => {
    // if (!client?.account.address) return;

    try {
      const encodedWillFactoryData = encodeFunctionData({
        abi: willFactoryAbi,
        functionName: "createWill",
        args: [],
      });

      sendUserOperation({
        uo: {
          target: WILL_FACTORY_CONTRACT_ADDRESS,
          data: encodedWillFactoryData,
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
        className="bg-blue-600 text-white w-40 rounded-md py-2 px-4"
        onClick={async () => {
          console.log("client account address", client?.account.address);
          deployContract();
        }}
        disabled={isSendingUserOperation}
      >
        {isSendingUserOperation ? "Sending..." : "Create Will"}
      </button>
      {error && <div>{error.message}</div>}
    </div>
  );
}
