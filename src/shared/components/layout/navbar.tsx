"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import LogoutButton from "@/features/auth/components/logout-button";

const Navbar = () => {
    const pathname = usePathname();

    const navlinks = [
        { name: "Resources", href: "/resources" },
        { name: "Bookings", href: "/bookings" },
        { name: "Favorites", href: "/favorites" },
    ];

    return (
        <div className="flex items-center justify-between px-8 h-25 bg-white border-b border-transparent">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 ">
                <Image
                    src="/assets/logo.png"
                    alt="Logo"
                    width={70}
                    height={70}
                    priority
                />

                <div className="flex">
                    <h1 className="text-[#1980D5] font-bold text-2xl">
                        Order
                    </h1>
                    <h1 className="text-[#63BE57] font-bold text-2xl">
                        Ease
                    </h1>
                </div>
            </Link>

            {/* Pages */}
            <div className="flex gap-10 h-full">
                {navlinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "relative flex items-center h-full font-bold text-2xl transition-colors ",
                                isActive
                                    ? "text-[#139DED]"
                                    : "hover:text-gray-700",
                            )}
                        >
                            {link.name}
                            {isActive && (
                                <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#139DED]" />
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* Avatar */}
            <div className="">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full h-18 w-18 p-0"
                        >
                            <Avatar className="h-18 w-18">
                                <AvatarImage src="" />
                                <AvatarFallback>Avatar</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>My Listings</DropdownMenuItem>
                            <DropdownMenuItem>Incoming Requests</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <LogoutButton />
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default Navbar;
