import { redirect, notFound } from "next/navigation";
import { auth } from "@/auth";
import { getListingById } from "@/lib/listings";
import Card from "@/components/ui/Card";
import EditListingForm from "@/components/listings/EditListingForm";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/my-listings");
  }

  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) {
    notFound();
  }

  if (listing.sellerId !== session.user.id) {
    redirect("/my-listings");
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-ink">Edit listing</h1>
      <p className="mt-1 text-sm text-ink/60">
        Update the details below and save your changes.
      </p>
      <Card className="mt-6 p-5">
        <EditListingForm listing={listing} />
      </Card>
    </div>
  );
}
