"use client";

import { useActionState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { resetPassword } from "@/lib/actions/reset-password";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction, isPending] = useActionState(resetPassword, {
    error: null,
    success: false,
  });

  if (state.success) {
    return (
      <div className="space-y-4 text-center">
        <p className="rounded-lg bg-eucalyptus-600/10 px-3 py-2 text-sm text-eucalyptus-600">
          Password updated. You can log in with your new password now.
        </p>
        <Link
          href="/login"
          className="inline-flex w-full items-center justify-center rounded-full bg-marigold-500 px-5 py-2.5 text-sm font-semibold text-coffee-950"
        >
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="token" value={token} />

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-ink">
          New password
        </label>
        <Input id="password" name="password" type="password" required minLength={8} placeholder="At least 8 characters" />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-ink">
          Confirm new password
        </label>
        <Input id="confirmPassword" name="confirmPassword" type="password" required minLength={8} />
      </div>

      {state.error && (
        <p className="rounded-lg bg-brick-600/10 px-3 py-2 text-sm text-brick-600">{state.error}</p>
      )}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Updating..." : "Update password"}
      </Button>
    </form>
  );
}
