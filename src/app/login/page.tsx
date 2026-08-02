import Card from "@/components/ui/Card";
import LoginForm from "@/components/auth/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-ink">
        Welcome back
      </h1>
      <p className="mt-1 text-sm text-ink/60">
        Log in to manage your listings and saved items.
      </p>
      <Card className="mt-6 p-5">
        <LoginForm callbackUrl={callbackUrl} />
      </Card>
    </div>
  );
}
