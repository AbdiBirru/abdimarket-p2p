import { getAllListingsForAdmin } from "@/lib/admin";
import AdminListingRow from "@/components/admin/AdminListingRow";

export const dynamic = "force-dynamic";

export default async function AdminListingsPage() {
  const listings = await getAllListingsForAdmin();

  return (
    <div>
      <h2 className="font-display text-lg font-bold text-coffee-950">
        All Listings ({listings.length})
      </h2>
      <div className="mt-4 space-y-2">
        {listings.map((listing) => (
          <AdminListingRow key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
