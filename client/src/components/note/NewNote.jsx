import { useState } from "react";
import EditNoteContent from "./EditNoteContent";
import Toolbar from "./Toolbar";

function NewNote() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleClickInside = (e) => {
    e.stopPropagation();
    if (!isOpen) {
      setInput(e.target.value);
      setIsOpen(true);
    }
  };

  const handleClickOutside = () => {
    if (isOpen) {
      setInput("");
      setIsOpen(false);
    }
  };

  return (
    <div
      className="bg-zinc-800 outline outline-1 outline-zinc-500 rounded-lg w-full max-w-[600px] mb-[18px] shadow-lg shadow-zinc-900/80 group"
      onClick={handleClickInside}
    >
      {isOpen ? (
        <>
          <EditNoteContent
            input={input}
            handleClickOutside={handleClickOutside}
          />
          <Toolbar isOpen={isOpen} handleClose={handleClickOutside} />
        </>
      ) : (
        <article className="px-4 py-3 overflow-auto">
          <header>
            <input
              id="newtaskinput"
              className="text-md font-medium block w-full bg-inherit focus:outline-none"
              placeholder="Create a task..."
              value={input}
              onChange={handleClickInside}
              autoFocus
            />
            <label htmlFor="newtaskinput" className="sr-only">
              Create a task
            </label>
          </header>
        </article>
      )}
    </div>
  );
}

export default NewNote;
