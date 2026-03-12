"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "@/features/auth/client/auth-client";
import toast from "react-hot-toast";
import { Github, Loader2 } from "lucide-react";

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isPending, setIsPending] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const err = searchParams.get("error");
    if (!err) return;

    toast.error("Login failed, try again!");
  }, [searchParams.get("error")]);

  const handleSignIn = async () => {
    if (isPending) return;
    setIsPending(true);

    const data = await signIn.social({
      provider: "github",
      errorCallbackURL: "/login",
    });

    if (!data) {
      return setIsPending(false);
    }
    if (data.error) return setIsPending(false);
    if (!data.data.redirect) return setIsPending(false);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-white/20 bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-slate-900">
            Welcome
          </CardTitle>
          <CardDescription className="text-slate-500">
            Login to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup className="gap-6">
              <Field>
                <Button
                  variant="default"
                  type="button"
                  disabled={isPending}
                  onClick={handleSignIn}
                >
                  {isPending
                    ? <Loader2 className="size-5 animate-spin" />
                    : <Github className="size-5" />}
                  {isPending ? "Connecting..." : "Login with Github"}
                </Button>
              </Field>
              <FieldSeparator className="text-slate-400 text-[10px] uppercase tracking-widest *:data-[slot=field-separator-content]:bg-white *:data-[slot=field-separator-content]:px-4">
                Secure Account Access
              </FieldSeparator>
              <Field>
                <FieldDescription className="text-center text-slate-500">
                  New here? Just sign in and we&apos;ll create your account
                  automatically.
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-xs text-slate-400">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline hover:text-[#1980D5]">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-[#1980D5]">
          Privacy Policy
        </a>.
      </FieldDescription>
    </div>
  );
}
