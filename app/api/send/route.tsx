import { BeneficiaryConfirmationEmail } from "@/components/app/BeneficiaryConfirmationEmail";
import { Resend } from "resend";
import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "willi-noreply@appstronauts.shop",
      to: ["helloanishjain@gmail.com"],
      subject: "Willi Smart Wallet",
      react: BeneficiaryConfirmationEmail({ benefactorName: "Fater" }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
