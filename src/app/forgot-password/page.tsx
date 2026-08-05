import Card from "@/components/ui/Card";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-ink">Reset your password</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Enter your email and we&apos;ll send you a link to reset your password.
      </p>
      <Card className="mt-6 p-5">
        <ForgotPasswordForm />
      </Card>
    </div>
  );
}
