import { SignInForm } from "../components/sign-in-form";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="relative min-h-svh flex flex-col items-center justify-center gap-6 p-6 md:p-10 bg-slate-50 overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#63BE57]/10 blur-[120px] rounded-full" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#1980D5]/10 blur-[120px] rounded-full" />
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none [background-image:radial-gradient(#1980D5_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-3 self-center font-bold text-2xl">
          <Image
            src="/assets/logo.webp"
            alt="Logo"
            width={40}
            height={40}
          />
          <div className="flex italic">
            <span className="text-[#1980D5]">Order</span>
            <span className="text-[#63BE57]">Ease</span>
          </div>
        </Link>

        <SignInForm />
      </div>
    </div>
  );
}
