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
  const { sendUserOperation, isSendingUserOperation, error } =
    useSendUserOperation({
      client,
      // optional parameter that will wait for the transaction to be mined before returning
      waitForTxn: true,
      onSuccess: async ({ hash, request }) => {
        console.log("Transaction hash:", hash);

        const receipt = await client?.getTransactionReceipt({ hash });
        console.log("Transaction receipt:", receipt);
        // for (let i = 0; i < (receipt?.logs.length ?? 0); i++) {
        //   console.log("logs", receipt?.logs[i]);
        // }
        if (receipt?.logs && receipt.logs.length >= 3) {
          const deployedWillAddress =
            receipt?.logs[receipt.logs.length - 3].address;
          if (client?.account.address) {
            setWillAddress(client.account.address, deployedWillAddress);
          }
        }
        // if (receipt?.logs && receipt.logs.length >= 3) {
        //   const deployedWillAddress = receipt.logs[2].address;
        //   console.log("Deployed Will Address:", deployedWillAddress);
        //   if (client?.account.address) {
        //     setWillAddress(client.account.address, deployedWillAddress);
        //   }
        // }
      },
      onError: (error) => {
        console.error(error);
      },
    });

  const deployContract = async () => {
    const beneficiaryAddress = "0x5C8aD0AA7Bd48f0D0EB0FAE8fDb01b83Fcaa8f89";
    try {
      const encodedWillFactoryData = encodeFunctionData({
        abi: willFactoryAbi,
        functionName: "createWill",
        args: [
          client?.account.address!, // smartAccount address
        ],
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
