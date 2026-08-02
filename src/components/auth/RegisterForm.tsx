"use client";

import { useActionState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { registerUser } from "@/lib/actions/register";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerUser, {
    error: null,
  });

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink">
          Full name
        </label>
        <Input id="name" name="name" type="text" required placeholder="Selam Abebe" />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
          Email
        </label>
        <Input id="email" name="email" type="email" required placeholder="you@example.com" />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-ink">
          Password
        </label>
        <Input id="password" name="password" type="password" required minLength={8} placeholder="At least 8 characters" />
      </div>

      {state.error && (
        <p className="rounded-lg bg-brick-600/10 px-3 py-2 text-sm text-brick-600">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-center text-sm text-ink/60">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-marigold-600">
          Log in
        </Link>
      </p>
    </form>
  );
}
