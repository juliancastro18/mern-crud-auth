import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useWindowSize from "../../hooks/useWindowSize";
import SearchBar from "./SearchBar";
import Logo from "../Logo";
import ProfileDropdown from "./ProfileDropdown";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [isOffset, setIsOffset] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const windowSize = useWindowSize();

  useEffect(() => {
    window.onscroll = () => {
      setIsOffset(window.scrollY > 0);
    };
  }, []);

  const separatorStyle =
    isOffset > 0
      ? "shadow-[0_0_10px_0_rgba(0,0,0,0.5)]"
      : "border-b border-b-zinc-500";

  if (!isAuthenticated) return;

  return (
    <nav
      className={`sticky z-10 top-0 min-h-[65px] bg-zinc-800 flex py-2 px-3 items-center ${separatorStyle}`}
    >
      <div
        className={`w-60 flex-shrink-0 items-center sm:inline-flex ${
          isSearchBarOpen ? "hidden" : "inline-flex"
        }`}
      >
        <button
          className="w-11 h-11 mr-1 flex items-center justify-center rounded-full hover:bg-zinc-100 hover:bg-opacity-10"
          onClick={() =>
            alert("Sorry, this is an MVP. This feature is not available yet.")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <Link to={"/"}>
          <Logo />
        </Link>
      </div>

      {(windowSize.width > 640 || isSearchBarOpen) && (
        <SearchBar
          className="w-full max-w-[45rem]"
          isSearchBarOpen={isSearchBarOpen}
          setIsSearchBarOpen={setIsSearchBarOpen}
          windowSize={windowSize}
        />
      )}

      <div className="shrink-0 ml-auto flex items-center gap-3 pl-3 md:pl-12">
        {!isSearchBarOpen && (
          <button
            className="p-3 hover:bg-zinc-200 hover:bg-opacity-20 rounded-full group-focus-within:hover:bg-opacity-50 sm:hidden"
            onClick={() => setIsSearchBarOpen(true)}
          >
            <svg
              className="w-4 h-4 text-zinc-300 group-focus-within:text-zinc-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        )}
        <span className="text-zinc-300 hidden md:block">{user.username}</span>
        <ProfileDropdown user={user} logout={logout} />
      </div>
    </nav>
  );
}

export default Navbar;
