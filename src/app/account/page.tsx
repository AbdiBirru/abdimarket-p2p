import { redirect } from "next/navigation";
import Link from "next/link";
import { Heart } from "lucide-react";
import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import Card from "@/components/ui/Card";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/account");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, createdAt: true },
  });

  if (!user) {
    redirect("/login");
  }

  const listingCount = await prisma.listing.count({
    where: { sellerId: session.user.id },
  });

  const memberSince = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(user.createdAt);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-coffee-950">My Account</h1>

      <Card className="mt-6 flex items-center gap-4 p-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-marigold-500 text-xl font-bold text-coffee-950">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-coffee-950">{user.name}</p>
          <p className="text-sm text-coffee-950/60">{user.email}</p>
          <p className="mt-1 text-xs text-coffee-950/40">Member since {memberSince}</p>
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link href="/my-listings">
          <Card className="p-4 transition-colors hover:bg-coffee-950/5">
            <p className="text-2xl font-bold text-coffee-950">{listingCount}</p>
            <p className="text-sm text-coffee-950/60">My Listings</p>
          </Card>
        </Link>
        <Link href="/saved">
          <Card className="p-4 transition-colors hover:bg-coffee-950/5">
            <Heart className="h-6 w-6 text-marigold-600" />
            <p className="mt-1 text-sm text-coffee-950/60">Saved Listings</p>
          </Card>
        </Link>
      </div>

      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
        className="mt-6"
      >
        <button className="text-sm font-medium text-brick-600">Log out</button>
      </form>
    </div>
  );
}
