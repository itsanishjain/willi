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
export default function Alive() {
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
        // Get the contract address from the receipt
        // const contractAddress = receipt?.contractAddress;
        // if (contractAddress) {
        //   setDeployedAddress(contractAddress);
        //   console.log("Contract deployed at:", contractAddress);
        // }
      },
      onError: (error) => {
        console.error(error);
        // [optional] Do something with the error
      },
    });

  const encodedTransferOwnership = encodeFunctionData({
    abi: multiOwnerLightAccountAbi,
    functionName: "updateOwners",
    args: [["0xF7594E70B730FB96fE2EE41611dce7Ee45c3ffEA"], []],
  });

  const buttonPressed = async () => {
    if (!client?.account.address) return;

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
        className="bg-blue-600 text-white w-40"
        onClick={async () => {
          console.log("client account address", client?.account.address);
          buttonPressed();

          // sendUserOperation({
          //   uo: {
          //     target: client!.account.address,
          //     data: encodedTransferOwnership,
          //   },
          // });
        }}
        disabled={isSendingUserOperation}
      >
        {isSendingUserOperation ? "Sending..." : "Send UO"}
      </button>
      {error && <div>{error.message}</div>}
    </div>
  );
}
