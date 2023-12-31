import { useRef } from "react";
import { useNotes } from "../../context/NoteContext";

function SearchBar({
  className,
  isSearchBarOpen,
  setIsSearchBarOpen,
  windowSize,
}) {
  const { searchNotes, setSearchNotes } = useNotes();
  const autoFocus = isSearchBarOpen && windowSize.width <= 640;
  const componentRef = useRef(null);
  const searchBarRef = useRef(null);

  const handleClickOutside = (e) => {
    if (!componentRef.current.contains(e.target)) {
      setIsSearchBarOpen(false);
    }
  };

  return (
    <div className={className} ref={componentRef}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          {windowSize.width > 640 ? (
            <button
              className="p-3 hover:bg-zinc-200 hover:bg-opacity-20 rounded-full group-focus-within:hover:bg-opacity-50 cursor-pointer"
              onClick={() => searchBarRef.current.focus()}
            >
              <svg
                className="w-4 h-4 text-zinc-300 group-focus-within:text-zinc-600 focus:text-zinc-300"
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
          ) : (
            <button
              className="p-3 hover:bg-zinc-200 hover:bg-opacity-20 rounded-full group-focus-within:hover:bg-opacity-50 cursor-pointer"
              onClick={() => setIsSearchBarOpen(false)}
            >
              <svg
                className="w-4 h-4 text-zinc-300 group-focus-within:text-zinc-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </button>
          )}
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-3 px-16 text-base rounded-lg bg-zinc-600 placeholder-zinc-400 focus:bg-white focus:text-zinc-900 outline-none"
          onChange={(e) => setSearchNotes(e.target.value)}
          value={searchNotes}
          onBlur={handleClickOutside}
          autoFocus={autoFocus}
          placeholder="Search"
          ref={searchBarRef}
        />
        {searchNotes && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              className="p-3 hover:bg-zinc-200 hover:bg-opacity-20 rounded-full group-focus-within:hover:bg-opacity-50"
              onClick={() => {
                setSearchNotes("");
                searchBarRef.current.focus();
              }}
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
    </div>
  );
}

export default SearchBar;
