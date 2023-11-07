import React from "react";
import { useNotes } from "../../context/NoteContext";

function SearchBar({ className }) {
  const { searchNotes, setSearchNotes } = useNotes();

  return (
    <form className={className}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium sr-only text-white"
      >
        Search
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <div className="p-3 hover:bg-zinc-200 hover:bg-opacity-20 rounded-full cursor-pointer group-focus-within:hover:bg-opacity-50">
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
          </div>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-3 pl-16 text-base rounded-lg bg-zinc-600 placeholder-zinc-400 focus:bg-white focus:text-zinc-900 outline-none"
          onChange={(e) => setSearchNotes(e.target.value)}
          value={searchNotes}
          placeholder="Search"
          required
        />
        {searchNotes && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              className="p-3 hover:bg-zinc-200 hover:bg-opacity-20 rounded-full group-focus-within:hover:bg-opacity-50"
              onClick={() => setSearchNotes("")}
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
                  d="M3 3 17 17M3 17 17 3"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

export default SearchBar;
