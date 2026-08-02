import { getAllUsersForAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await getAllUsersForAdmin();

  return (
    <div>
      <h2 className="font-display text-lg font-bold text-ink">
        All Users ({users.length})
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-ink/50">
              <th className="py-2 pr-3 font-medium">Name</th>
              <th className="py-2 pr-3 font-medium">Email</th>
              <th className="py-2 pr-3 font-medium">Role</th>
              <th className="py-2 pr-3 font-medium">Listings</th>
              <th className="py-2 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-line">
                <td className="py-2 pr-3 text-ink">{user.name}</td>
                <td className="py-2 pr-3 text-ink/70">{user.email}</td>
                <td className="py-2 pr-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      user.role === "ADMIN"
                        ? "bg-marigold-500/20 text-marigold-600"
                        : "bg-ink/5 text-ink/60"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-2 pr-3 text-ink/70">{user._count.listings}</td>
                <td className="py-2 text-ink/50">
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).format(user.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
