"use client";
import { signOut } from "@/features/auth/client/auth-client";
import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

// Event handlers need to run on the client..
// The line above tells Next.js that this component needs to run client side.

export default function LogoutButton() {

  const logout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  };

  return (
    <DropdownMenuItem
      variant="destructive"
      onClick={logout}
      className="cursor-pointer w-full flex items-center gap-2"
    >
      <LogOut size={4} />
      <span>Log out</span>
    </DropdownMenuItem>
  );
}
