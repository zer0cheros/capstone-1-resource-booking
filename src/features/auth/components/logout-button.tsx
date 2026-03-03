"use client"

import { Button } from "@/shared/components/ui/button"
import {signOut} from '@/features/auth/client/auth-client'
import { useRouter } from "next/navigation"

// Event handlers need to run on the client..
// The line above tells Next.js that this component needs to run client side.

export default function LogoutButton() {

  const router = useRouter()

  const logout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
        },
      },
    });
  }

  return (
      <Button onClick={logout}>Logout</Button>
  )
}