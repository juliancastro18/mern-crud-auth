import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/kip_logo.png";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";

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

  return (
    <nav
      className={`sticky top-0 bg-zinc-800 flex items-center justify-between py-2 px-2 ${separatorStyle}`}
    >
      <div className="inline-flex">
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

        <Link className="inline-flex items-center" to={isAuthenticated ? "/tasks" : "/"}>
          <img src={logo} width="44" height="40" alt="Kip Logo" className="p-1" />
          <h1 className="text-2xl px-2 font-normal text-zinc-200">Kip</h1>
        </Link>
      </div>

      <SearchBar />

      <ul className="flex gap-x-2">
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
