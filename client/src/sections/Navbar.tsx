"use client";

import { useEffect } from "react";
import Image from "next/image";
import Uparrow from "@/assets/uil_arrow-up.svg";
import { NavLinks } from "@/components/NavLinks";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";
import logo from "@/assets/Logo.svg";
import { useMyContext } from "@/context/MyContext";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { userProfile, setUserProfile } = useMyContext();
  const { user, isAuthenticated, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  useEffect(() => {
    if (user) {
      setUserProfile(user);
    }
  }, [user, setUserProfile]);

  return (
    <nav className="fixed top-0 backdrop-blur-md z-30 w-full">
      <div className="flex justify-between items-center h-[10vh] px-6 md:px-32 w-full">
        <div className="flex gap-2 items-center">
          <Image src={logo} alt="Logo" width={35} height={35} />
          <Link
            href="/"
            className="font-medium font-chillax text-[1.2rem] md:text-[1.5rem] text-white"
          >
            Career Compass
          </Link>
        </div>

        <div className="hidden md:flex font-medium">
          <NavLinks />
        </div>

        {/* Authentication Section */}
        {isAuthenticated && user ? (
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-[#121212] px-3 py-2 rounded-lg border border-gray-800">
              <div className="w-8 h-8 bg-[#7D47EA]/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-[#7D47EA]" />
              </div>
              <span className="text-white text-sm">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg transition-colors text-white"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <Link href="/sign-in" className="hidden md:flex">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-[#171717] flex items-center px-4 py-2 rounded-full active:bg-[#7D47EA]"
            >
              <span>Sign in</span>
              <Image src={Uparrow} alt="up-arrow" className="ml-2" />
            </HoverBorderGradient>
          </Link>
        )}

        {/* Mobile Menu Button (visible on small screens) */}
        <div className="flex md:hidden">
          <button className="text-white">
            <Image src={Uparrow} alt="mobile-menu" width={30} height={30} />
          </button>
        </div>
      </div>
    </nav>
  );
}
