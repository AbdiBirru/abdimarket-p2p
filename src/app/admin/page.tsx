import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

  // The real gate: re-check the role against the database, not just the
  // JWT the proxy already looked at. A session token can outlive a role
  // change or get forged in ways a proxy layer alone can't catch.
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-coffee-950">Admin Dashboard</h1>
      <p className="mt-1 text-sm text-coffee-950/60">
        Listings, users, and reported content management arrive Day 27-28.
      </p>
    </div>
  );
}
