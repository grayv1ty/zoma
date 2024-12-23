import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-2 text-white">
        <Image src="logo.svg" width={32} height={32} alt="logo" />
        <p className="text-2xl font-bold max-sm:hidden">ZOMA</p>
      </Link>
      <div className="flex justify-between items-center gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
