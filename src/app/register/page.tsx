import Card from "@/components/ui/Card";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-coffee-950">
        Create your account
      </h1>
      <p className="mt-1 text-sm text-coffee-950/60">
        Join AbdiMarket-P2P to buy and sell directly with people near you.
      </p>
      <Card className="mt-6 p-5">
        <RegisterForm />
      </Card>
    </div>
  );
}
