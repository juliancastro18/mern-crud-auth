import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";
import Logo from "./Logo";


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
      className={`sticky top-0 bg-zinc-800 flex py-2 px-2 justify-between items-center ${separatorStyle}`}
    >
      <div className="w-60 flex-shrink-0 inline-flex">
        <button className="w-11 h-11 mx-1 flex items-center justify-center">
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
    
      <SearchBar className="w-full max-w-3xl" />

      <ul className="ml-auto flex gap-x-2 pl-8">
        {isAuthenticated ? (
          <>
            <li>Welcome {user.username}</li>
            <li>
              <Link
                to="/add-task"
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >
                Add Task
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
