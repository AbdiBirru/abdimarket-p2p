import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

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
      <nav className="mt-4 flex gap-4 border-b border-coffee-950/10 pb-3 text-sm font-medium">
        <Link href="/admin" className="text-coffee-950">
          Overview
        </Link>
        <Link href="/admin/listings" className="text-coffee-950/60 hover:text-coffee-950">
          Listings
        </Link>
        <Link href="/admin/users" className="text-coffee-950/60 hover:text-coffee-950">
          Users
        </Link>
      </nav>
      <div className="mt-6">{children}</div>
    </div>
  );
}
