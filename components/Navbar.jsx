"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import profileDefault from "@/assets/images/profile.png";
import UnreadMessageCount from "./UnreadMessageCount";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 left-0 w-full z-[1000] bg-white ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Mobile Menu Toggle */}
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          {/* Logo and Nav Links */}
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <Link className="flex flex-shrink-0 items-center" href="/">
              <Image
                className="h-10 w-auto"
                src="/images/logo.png"
                alt="NilRentTrack"
                width={100}
                height={40}
              />
              <span className="hidden md:block text-[#55525d] font-semibold text-2xl font-bold ml-2">
                <span className="text-[#3c3c63]">NilRent</span><span className="text-[#7265df]">Track</span>
              </span>
            </Link>
            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-2">
                <Link
                  href="/"
                  className={`text-[#55525d] hover:text-[#7265df] font-semibold rounded-md px-3 py-2 ${
                    pathname === "/" ? "text-[#7265df]" : ""
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/properties"
                  className={`text-[#55525d] hover:text-[#7265df] font-semibold rounded-md px-3 py-2 ${
                    pathname === "/properties" ? "text-[#7265df]" : ""
                  }`}
                >
                  Properties
                </Link>
                {isAuthenticated && (
                  <Link
                    href="/properties/add"
                    className={`text-[#55525d] hover:text-[#7265df] font-semibold rounded-md px-3 py-2 ${
                      pathname === "/properties/add" ? "text-[#7265df]" : ""
                    }`}
                  >
                    Add Property
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right Side (Auth Buttons or Profile) */}
          {!isAuthenticated ? (
            <div className="flex space-x-2">
              <Link
                href="/login"
                className="bg-[#7265df] px-4 py-2 rounded-md text-white border border-[#7265df] hover:bg-[#f2f2f2] hover:text-[#7265df] hover:border-[#9c9ddc]"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[#7265df] px-4 py-2 rounded-md text-white border border-[#7265df] hover:bg-[#f2f2f2] hover:text-[#7265df] hover:border-[#9c9ddc]"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
              <Link href="/messages" className="relative group">
                <button className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>
                <UnreadMessageCount />
              </Link>

              {/* Profile Dropdown */}
              <div className="relative ml-3" ref={profileMenuRef}>
                <button
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={user?.profileImage || profileDefault}
                    alt="Profile"
                    width={40}
                    height={40}
                  />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                    {[
                      { href: "/profile", label: "Your Profile" },
                      { href: "/properties/saved", label: "Saved Properties" },
                      { href: "/properties/add", label: "Add Properties" },
                      {
                        href: "/properties/myproperties",
                        label: "My Properties",
                      },
                    ].map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className="block px-4 py-2 text-sm text-gray-700"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        {label}
                      </Link>
                    ))}
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Optional: Mobile menu panel if you want to add mobile links */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-700 hover:text-[#7265df]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/properties"
              className="block px-3 py-2 text-gray-700 hover:text-[#7265df]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Properties
            </Link>
            {isAuthenticated && (
              <Link
                href="/properties/add"
                className="block px-3 py-2 text-gray-700 hover:text-[#7265df]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Add Property
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
