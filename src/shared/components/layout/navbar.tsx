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
import { Menu } from "lucide-react";

const Navbar = () => {
    const pathname = usePathname();

    const navlinks = [
        { name: "Resources", href: "/resources" },
        { name: "Bookings", href: "/bookings" },
        { name: "Favorites", href: "/favorites" },
    ];

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
                            <DropdownMenuItem>
                                Incoming Requests
                            </DropdownMenuItem>
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
