"use client";
import React, { useState, useEffect } from "react";
import {
  type UseSendUserOperationResult,
  useAuthenticate,
  useUser,
  useSignerStatus,
  useSendUserOperation,
  useSmartAccountClient,
  useAuthModal,
} from "@account-kit/react";
import willFactoryJson from "@/app/abi/WillFactory.json";
const willFactoryAbi = willFactoryJson.abi;

import multiOwnerLightAccountJson from "@/app/abi/MultiOwnerLightAccount.json";
const multiOwnerLightAccountAbi = multiOwnerLightAccountJson.abi;

import { Address, encodeFunctionData, parseAbi } from "viem";
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
  const { authenticate, isPending } = useAuthenticate({
    onSuccess: () => {
      deployContract();
    },
  });
  const user = useUser();
  const signerStatus = useSignerStatus();
  const { openAuthModal } = useAuthModal();

  const [hasSentUpdateOwners, setHasSentUpdateOwners] = useState(false);
  type NewType = Address;

  const [deployedWillAddressState, setDeployedWillAddressState] =
    useState<NewType>();

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
        if (hasSentUpdateOwners) {
          return;
        }
        setHasSentUpdateOwners(true);

        if (receipt?.logs && receipt.logs.length >= 3) {
          const deployedWillAddress =
            receipt?.logs[receipt.logs.length - 3].address;
          if (client?.account.address) {
            setWillAddress(client.account.address, deployedWillAddress);
            setDeployedWillAddressState(deployedWillAddress as any); // Type assertion to fix type error
          }
          updateOwnersToWill(deployedWillAddress);
        }
      },
      onError: (error) => {
        console.error(error);
      },
    });

  const deployContract = async () => {
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

  const updateOwnersToWill = async (willAddress: Address) => {
    try {
      const encodedUpdateOwnership = encodeFunctionData({
        abi: multiOwnerLightAccountAbi,
        functionName: "updateOwners",
        args: [[willAddress], []],
      });

      sendUserOperation({
        uo: {
          target: client?.account.address as Address,
          data: encodedUpdateOwnership,
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
          setHasSentUpdateOwners(false);
          if (signerStatus.isConnected) {
            deployContract();
          } else {
            try {
              openAuthModal();
            } catch (error) {
              console.log(error);
            }
          }
        }}
        disabled={isSendingUserOperation || isPending}
      >
        {isSendingUserOperation
          ? "Sending..."
          : isPending
          ? "Signing in..."
          : "Create Will"}
      </button>
      {/* {error && <div>{error.message}</div>} */}
    </div>
  );
}
