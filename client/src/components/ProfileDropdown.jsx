import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom'
import profilePic from "../assets/profile.jpg";

function ProfileDropdown({ className, user, logout }) {
  const [isOpen, setIsOpen] = useState(false);
  const initials = user.username.slice(0, 1).toUpperCase();

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) setIsOpen(false);
    };

    document.addEventListener("mousedown", handler);
  });

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <button
        id="dropdownUserAvatarButton"
        className="flex bg-zinc-800 rounded-full focus:ring-4 focus:ring-zinc-600 ring-inset p-1 mx-1"
        type="button"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <span className="sr-only">Open user menu</span>
        <div className="w-8 h-8 bg-amber-400 rounded-full font-bold text-lg flex items-center justify-center text-white">
          <span>{initials}</span>
        </div>
      </button>

      {isOpen && (
        <div
          id="dropdownAvatar"
          className="z-10 divide-y rounded-lg shadow min-w-[10rem] bg-zinc-700 divide-zinc-600 absolute right-0 top-[52px]"
        >
          <div className="px-4 py-3 text-sm text-white">
            <div className="font-medium truncate">{user.email}</div>
          </div>
          <div className="py-2">
            <Link
              to="/"
              onClick={() => {
                logout();
              }}
              className="block px-4 py-2 text-sm hover:bg-zinc-600 text-zinc-200 hover:text-white"
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
