import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Card from "@/components/ui/Card";
import CreateListingForm from "@/components/listings/CreateListingForm";

export default async function SellPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/sell");
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-coffee-950">Sell an item</h1>
      <p className="mt-1 text-sm text-coffee-950/60">
        Fill in the details below. Buyers will see this exactly as you enter it.
      </p>
      <Card className="mt-6 p-5">
        <CreateListingForm />
      </Card>
    </div>
  );
}
