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
  encodeFunctionData,
  parseAbi,
  decodeFunctionResult,
  decodeEventLog,
} from "viem";
import { WILL_FACTORY_CONTRACT_ADDRESS } from "@/app/lib/constants";
import { SALT } from "@/app/lib/constants";
import { useWillStore } from "@/app/store/willStore";

export default function CreateWill() {
  const { client } = useSmartAccountClient({
    type: "MultiOwnerLightAccount",
    policyId: process.env.NEXT_PUBLIC_POLICY_ID!,
    accountParams: {
      salt: BigInt(SALT),
    },
  });

  const { setWillAddress } = useWillStore();

  const {
    sendUserOperation,
    isSendingUserOperation,
    error,
    sendUserOperationResult,
  } = useSendUserOperation({
    client,
    waitForTxn: true,
    onSuccess: async ({ hash, request }) => {
      console.log("Transaction hash:", hash);

      const receipt = await client?.getTransactionReceipt({ hash });
      console.log("Transaction receipt:", receipt);

      if (receipt?.logs && receipt.logs.length >= 2) {
        const deployedWillAddress = receipt.logs[1].address;
        console.log("Deployed Will Address:", deployedWillAddress);
        if (client?.account.address) {
          setWillAddress(client.account.address, deployedWillAddress);
        }
      }
    },
    onError: (error) => {
      console.error("Operation failed:", error);
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
