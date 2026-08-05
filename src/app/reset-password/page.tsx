import Card from "@/components/ui/Card";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-ink">Set a new password</h1>
      <Card className="mt-6 p-5">
        {token ? (
          <ResetPasswordForm token={token} />
        ) : (
          <p className="text-sm text-brick-600">
            This reset link is missing its token. Request a new one from the{" "}
            <a href="/forgot-password" className="font-semibold text-marigold-600">
              forgot password
            </a>{" "}
            page.
          </p>
        )}
      </Card>
    </div>
  );
}
