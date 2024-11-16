import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { accounts, beneficiaries } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const uuid = body.uuid;

    const newAccount = await db
      .insert(accounts)
      .values({
        email: body.email,
        walletAddress: body.walletAddress,
      })
      .onConflictDoUpdate({
        target: accounts.walletAddress,
        set: {
          email: body.email,
        },
      })
      .returning();

    if (uuid) {
      await db.update(beneficiaries).set({
        status: true,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Account added successfully",
        data: newAccount,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("FFFFF", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
