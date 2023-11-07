import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SearchBar from "./SearchBar";
import Logo from "../Logo";
import ProfileDropdown from "./ProfileDropdown";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [isOffset, setIsOffset] = useState(false);

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
      className={`sticky top-0 bg-zinc-800 flex py-2 px-3 items-center ${separatorStyle}`}
    >
      <div className="w-60 flex-shrink-0 inline-flex items-center">
        <button
          className="w-11 h-11 mr-1 flex items-center justify-center rounded-full hover:bg-zinc-100 hover:bg-opacity-10"
          onClick={() => alert("Sorry, this is an MVP. This feature is not yet available.")}
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

      <SearchBar className="w-full max-w-[45rem]" />

      <div className="shrink-0 ml-auto flex items-center gap-3">
        <span className="text-zinc-300">{user.username}</span>
        <ProfileDropdown user={user} logout={logout} />
      </div>
    </nav>
  );
}

export default Navbar;
