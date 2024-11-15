// app/api/beneficiaries/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";

// Validation schema
const beneficiarySchema = z.object({
  walletAddress: z.string().min(1, "Wallet address is required"),
  email: z.string().email("Invalid email address"),
  trustPercentage: z.string().transform((val) => {
    const num = parseInt(val);
    if (isNaN(num) || num < 0 || num > 100) {
      throw new Error("Percentage must be between 0 and 100");
    }
    return num;
  }),
  relationship: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = beneficiarySchema.parse(body);

    // Here you would typically:
    // 1. Connect to your database
    // 2. Create the beneficiary record
    // 3. Return the created beneficiary

    // For now, we'll just return a success response
    return NextResponse.json(
      {
        success: true,
        message: "Beneficiary added successfully",
        data: validatedData,
      },
      { status: 201 }
    );
  } catch (error) {
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
export async function GET() {
  try {
    // Here you would typically:
    // 1. Connect to your database
    // 2. Fetch beneficiaries
    // 3. Return the beneficiaries

    // For now, return mock data
    return NextResponse.json({
      success: true,
      data: [
        {
          id: "1",
          walletAddress: "proofofwill.eth",
          shortAddress: "0xd0f4...f743",
          trustPercentage: "40",
          email: "willi@alchemy.com",
          relationship: "Brother",
          phoneNumber: "(282)382-2716",
          status: "Active",
        },
      ],
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
