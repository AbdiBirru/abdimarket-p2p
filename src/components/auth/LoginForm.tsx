"use client";

import { useActionState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { loginUser } from "@/lib/actions/login";

export default function LoginForm({ callbackUrl }: { callbackUrl?: string }) {
  const [state, formAction, isPending] = useActionState(loginUser, {
    error: null,
  });

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="redirectTo" value={callbackUrl ?? "/"} />

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
          Email
        </label>
        <Input id="email" name="email" type="email" required placeholder="you@example.com" />
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-ink">
            Password
          </label>
          <Link href="/forgot-password" className="text-xs font-medium text-marigold-600">
            Forgot password?
          </Link>
        </div>
        <Input id="password" name="password" type="password" required placeholder="Your password" />
      </div>

      {state.error && (
        <p className="rounded-lg bg-brick-600/10 px-3 py-2 text-sm text-brick-600">{state.error}</p>
      )}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Logging in..." : "Log in"}
      </Button>

      <p className="text-center text-sm text-ink-muted">
        New to AbdiMarket-P2P?{" "}
        <Link href="/register" className="font-semibold text-marigold-600">
          Create an account
        </Link>
      </p>
    </form>
  );
}
