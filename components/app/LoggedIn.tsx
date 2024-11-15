"use client";
import React from "react";
import {
  type UseSendUserOperationResult,
  useSendUserOperation,
  useSmartAccountClient,
} from "@account-kit/react";
import { encodeFunctionData } from "viem";
import { abi } from "@/app/abi/MultiOwnerLightAccount.json"; // If using generated types
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
        // [optional] Do something with the hash and request
      },
      onError: (error) => {
        // [optional] Do something with the error
      },
    });

  const encodedTransferOwnership = encodeFunctionData({
    abi,
    functionName: "updateOwners",
    args: [["0xF7594E70B730FB96fE2EE41611dce7Ee45c3ffEA"], []],
  });

  return (
    <div>
      <button
        onClick={
          async () => {
            console.log("client account address", client?.account.address);
            // const plugins = await client?.getInstalledPlugins({account:})
            // console.log("Installed Plugins", client?.getInstalledPlugins);
            // client?.updateOwners({
            //   args: [
            //     ["0xF7594E70B730FB96fE2EE41611dce7Ee45c3ffEA"], // ownersToAdd
            //     [], // ownersToRemove
            //   ],
            // });
            sendUserOperation({
              uo: {
                target: "0x406126d4662812F1D5b14d7351CEd8a74351Bcd1",
                data: "0xd09de08a",
              },
            });
            // sendUserOperation({
            //   uo: {
            //     target: client!.account.address,
            //     data: encodedTransferOwnership,
            //   },
            // });
          }
          // sendUserOperation({
          //   uo: {
          //     target: "0xTARGET_ADDRESS",
          //     data: "0x",
          //     value: BigInt(0),
          //   },
          // })
        }
        disabled={isSendingUserOperation}
      >
        {isSendingUserOperation ? "Sending..." : "Send UO"}
      </button>
      {error && <div>{error.message}</div>}
    </div>
  );
}
