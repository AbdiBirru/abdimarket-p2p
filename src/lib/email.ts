import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  await resend.emails.send({
    from: "AbdiMarket-P2P <onboarding@resend.dev>",
    to,
    subject: "Reset your AbdiMarket-P2P password",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px;">
        <h1 style="color: #2b1810; font-size: 20px;">Reset your password</h1>
        <p style="color: #4a2e1d; font-size: 14px; line-height: 1.6;">
          Someone requested a password reset for your AbdiMarket-P2P account. If this was you, tap the button below — this link expires in 1 hour.
        </p>
        <a href="${resetUrl}" style="display: inline-block; margin-top: 16px; background-color: #e8a33d; color: #2b1810; font-weight: 600; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-size: 14px;">
          Reset password
        </a>
        <p style="color: #8a7060; font-size: 12px; margin-top: 24px;">
          If you didn't request this, you can safely ignore this email — your password will stay the same.
        </p>
      </div>
    `,
  });
}
