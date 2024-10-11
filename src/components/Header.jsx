"use client";

import { useAuth } from "@/context/authContext";
import axios from "axios";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const { user, setUser } = useAuth();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/logout");
      if (response.status === 200) {
        router.push("/");
        setUser(null);
      } else {
        console.error("Logout Failed");
      }
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };

  let currentPath = usePathname();
  return (
    <>
      <nav className="bg-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link className="-m-1.5 p-1.5" href="/">
            <span className="text-xl font-normal">
              event<span className="text-violet-700 font-bold">App</span>
            </span>
          </Link>
          <div className="md:hidden">
            <button
              onClick={toggleDrawer}
              className="text-gray-700 hover:text-violet-700"
            >
              Menu
            </button>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link
              href="/"
              className={`text-gray-700 hover:text-violet-700 ${
                currentPath === "/" ? "text-violet-700" : ""
              }`}
            >
              Upcoming Events
            </Link>
            <Link
              href="/archive"
              className={`text-gray-700 hover:text-violet-700 ${
                currentPath === "/archive" ? "text-violet-700" : ""
              }`}
            >
              Events Archive
            </Link>
          </div>
          <div className="relative">
            {user && (
              <>
                <button
                  onClick={toggleUserMenu}
                  className="text-gray-700 hover:text-violet-700"
                >
                  {user.username}
                </button>
                {/* User Popover */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white z-50">
                    <div className="py-2">
                      <Link
                        href="/add-event"
                        className="block px-4 py-2 text-violet-700 hover:bg-violet-100"
                        onClick={toggleUserMenu}
                      >
                        Add Event
                      </Link>
                      <Link
                        href="/my-events"
                        className="block px-4 py-2 text-violet-700 hover:bg-violet-100"
                        onClick={toggleUserMenu}
                      >
                        My Events
                      </Link>
                      <button
                        onClick={() => {
                          toggleUserMenu();
                          handleLogout();
                        }}
                        className="w-full text-left block px-4 py-2 text-violet-700 hover:bg-violet-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
            {!user && (
              <Link
                href="/login"
                className="block px-4 py-2 text-violet-700 hover:bg-violet-100"
              >
                Log in
              </Link>
            )}
          </div>
        </div>

        {/* Drawer for mobile */}
        <div
          className={`md:hidden fixed inset-x-0 top-0 transform bg-white p-4 ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{ zIndex: 50, top: isOpen ? 60 : 0 }}
        >
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              className={`text-gray-700 hover:text-violet-700 ${
                currentPath === "/" ? "text-violet-700" : ""
              }`}
              onClick={() => {
                toggleDrawer();
              }}
            >
              Upcoming Events
            </Link>
            <Link
              href="/archive"
              className={`text-gray-700 hover:text-violet-700 ${
                currentPath === "/archive" ? "text-violet-700" : ""
              }`}
              onClick={() => {
                toggleDrawer();
              }}
            >
              Events Archive
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
