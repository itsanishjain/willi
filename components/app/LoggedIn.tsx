"use client";
import React from "react";
import {
  type UseSendUserOperationResult,
  useSendUserOperation,
  useSmartAccountClient,
} from "@account-kit/react";
import { abi as multiOwnerLightAccountAbi } from "@/app/abi/MultiOwnerLightAccount.json"; // If using generated types
import { bytecode, abi as willAbi } from "@/app/abi/Will.json";
import { sepolia } from "viem/chains";
import {
  createWalletClient,
  http,
  encodeFunctionData,
  parseAbi,
  encodeDeployData,
} from "viem";
export default function MyOpSenderComponent() {
  const { client } = useSmartAccountClient({
    type: "MultiOwnerLightAccount",
    policyId: process.env.NEXT_PUBLIC_POLICY_ID!,
    accountParams: {
      salt: BigInt(3),
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

  const deployContract = async () => {
    if (!client?.account.address) return;

    const constructorArgs = [client.account.address]; // Set smart account as owner
    // const userOp = await client.buildUserOperationFromTx({
    //   to: "0x0000000000000000000000000000000000000000" as `0x${string}`,
    //   data: bytecode.object as `0x${string}`,
    //   // value: BigInt(0),
    //   chain: sepolia,
    // });
    try {
      // Encode constructor arguments
      const deployData = encodeDeployData({
        abi: willAbi,
        bytecode: bytecode.object as `0x${string}`,
        args: [], // Pass deployer's address as initialOwner
      });

      sendUserOperation({
        uo: {
          target: "0x0000000000000000000000000000000000000000",
          data: deployData,
          value: BigInt(0),
        },
      });
    } catch (error) {
      console.error(error);
    }
    // const encodedConstructorArgs = encodeFunctionData({
    //   abi: [
    //     {
    //       type: "constructor",
    //       inputs: [{ type: "address", name: "initialOwner" }],
    //       stateMutability: "nonpayable" as const,
    //     },
    //   ],

    //   args: constructorArgs,
    // });

    // sendUserOperation({
    //   uo: {
    //     target: "0x0000000000000000000000000000000000000000",
    //     data: `0x${bytecode.object}${encodedConstructorArgs.slice(2)}`,
    //   },
    // });
  };

  return (
    <div>
      <button
        className="bg-blue-600 text-white w-40"
        onClick={async () => {
          console.log("client account address", client?.account.address);
          deployContract();

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
