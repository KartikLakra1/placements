"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-gray-900 shadow-md p-4 flex items-center justify-between">
      {/* Logo / Title */}
      <h1 className="text-xl md:text-2xl font-bold text-white">
        Delhi Technological University
      </h1>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-6 text-gray-300">
        <Link href="/" className="hover:text-white transition">
          Home
        </Link>
        <Link href="/students" className="hover:text-white transition">
          Students
        </Link>
        <Link href="/about" className="hover:text-white transition">
          About
        </Link>
        <Link href="/contact" className="hover:text-white transition">
          Contact
        </Link>
      </nav>

      {/* Mobile Nav (Hamburger + Drawer) */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-gray-900 text-gray-200">
            <SheetHeader>
              <SheetTitle className="text-white text-lg">Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex pl-9 flex-col gap-4">
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
              <Link href="/students" className="hover:text-white transition">
                Students
              </Link>
              <Link href="/about" className="hover:text-white transition">
                About
              </Link>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </nav>
            <div className="text-gray-400 text-sm mt-4 pl-9">
              Made by Kartik Lakra and Hemonesh
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
