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
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import { Bell, Menu, Package, User } from "lucide-react";
import { Session } from "@/features/auth/types/session";

type NavbarProps = {
    user: NonNullable<Session["user"]>;
}

const Navbar = ({ user }: NavbarProps) => {
    const pathname = usePathname();

    const navlinks = [
        { name: "Resources", href: "/resources" },
        { name: "Bookings", href: "/bookings" },
        { name: "Favorites", href: "/favorites" },
    ];

    const parts = user.name.trim().split(/\s+/);
    const first = parts[0]?.[0];
    const last = parts.length > 1 
        ? parts[parts.length - 1][0]
        : "";
    const initials = (first + last).toUpperCase();

    return (
        <div className="flex items-center justify-between px-4 sm:px-8 h-20 bg-white border-b border-slate-100 shadow-sm sticky top-0 z-50">
            {/* Left Section: Mobile Menu & logo */}
            <div className="flex items-center gap-4">
                <div className="sm:hidden">
                    <Sheet>
                        <SheetTrigger>
                            <Button variant="ghost">
                                <Menu className="size-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="w-[250px] sm:w-[300px]"
                        >
                            <SheetHeader className="text-left mb-8">
                                <SheetTitle className="flex items-center">
                                    <span className="text-gb-blue">
                                        Order
                                    </span>
                                    <span className="text-gb-green">Ease</span>
                                </SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-4">
                                {navlinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "text-lg font-semibold p-2 rounded-md transition-colors",
                                            pathname === link.href
                                                ? "bg-blue-50 text-[#139DED]"
                                                : "text-slate-600 hover:bg-slate-50",
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Logo */}
                <Link href="/" className="flex items-center gap-1 sm:gap-3 ">
                    <div className="relative w-10 h-10 sm:w-16 sm:h-16">
                        <Image
                            src="/assets/logo.png"
                            alt="Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    <div className="flex font-bold text-base sm:text-2xl">
                        <h1 className="text-gb-blue">
                            Order
                        </h1>
                        <h1 className="text-gb-green">
                            Ease
                        </h1>
                    </div>
                </Link>
            </div>

            {/* Pages */}
            <nav className="hidden sm:flex gap-6 md:gap-10 h-full">
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
            </nav>

            {/* Avatar */}
            <div className="">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="rounded-full h-12 w-12 p-0 border-2 border-slate-100 hover:border-gb-blue transition-all"
                        >
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={user.image || ""} />
                                <AvatarFallback className="bg-gb-blue text-white">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-56 mt-2 rounded-2xl shadow-2xl border border-slate-200 bg-white/95 backdrop-blur-md"
                        align="end"
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                asChild
                                className="cursor-pointer py-3 rounded-lg"
                            >
                                <Link
                                    href="/profile"
                                    className="flex items-center"
                                >
                                    <User className="mr-3 size-4 text-slate-500" />
                                    <span className="font-semibold text-slate-700">
                                        Profile
                                    </span>
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                asChild
                                className="cursor-pointer py-3 rounded-lg"
                            >
                                <Link
                                    href="/my-listings"
                                    className="flex items-center"
                                >
                                    <Package className="mr-3 size-4 text-slate-500" />
                                    <span className="font-semibold text-slate-700">
                                        My Listings
                                    </span>
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                asChild
                                className="cursor-pointer py-3 rounded-lg"
                            >
                                <Link
                                    href="/manage-bookings"
                                    className="flex items-center"
                                >
                                    <Bell className="mr-3 size-4 text-slate-500" />
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-slate-700">
                                            Incoming Requests
                                        </span>
                                        <span className="text-[10px] text-gb-blue font-bold uppercase tracking-tighter">
                                            Manage Approvals
                                        </span>
                                    </div>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator className="bg-slate-100" />

                        <div className="p-1">
                            <LogoutButton />
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default Navbar;
