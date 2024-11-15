import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { beneficiaries, accounts } from "@/db/schema";
import { eq } from "drizzle-orm";

// Validation schema
const beneficiarySchema = z.object({
  walletAddress: z.string().optional(),
  email: z.string().email("Invalid email address"),
  trustPercentage: z.string(),
  relationship: z.string().optional(),
  phoneNumber: z.string().optional(),
  accountWalletAddress: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = beneficiarySchema.parse(body);

    if (validatedData.walletAddress) {
      // Get the authenticated user's account ID
      const account = await db.query.accounts.findFirst({
        where: eq(accounts.walletAddress, validatedData.walletAddress),
      });

      if (!account) {
        return NextResponse.json(
          {
            success: false,
            message: "Account not found",
          },
          { status: 404 }
        );
      }

      // Create the beneficiary record
      const beneficiary = await db
        .insert(beneficiaries)
        .values({
          email: validatedData.email,
          trustPercentage: validatedData.trustPercentage.toString(),
          relationship: validatedData.relationship,
          phoneNumber: validatedData.phoneNumber,
          accountWalletAddress: validatedData.accountWalletAddress,
        })
        .returning();

      return NextResponse.json(
        {
          success: true,
          message: "Beneficiary added successfully",
          data: beneficiary,
        },
        { status: 201 }
      );
    } else {
      const beneficiary = await db
        .insert(beneficiaries)
        .values({
          email: validatedData.email,
          trustPercentage: validatedData.trustPercentage.toString(),
          relationship: validatedData.relationship,
          phoneNumber: validatedData.phoneNumber,
          accountWalletAddress: validatedData.accountWalletAddress,
        })
        .returning();

      return NextResponse.json(
        {
          success: true,
          message: "Beneficiary added successfully",
          data: beneficiary,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("DFASDFASDFASDF", error);
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

// Optional: GET endpoint to fetch beneficiaries
export async function GET(request: Request) {
  try {
    const fetchedBeneficiaries = await db.select().from(beneficiaries);

    return NextResponse.json({
      success: true,
      data: beneficiaries,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
