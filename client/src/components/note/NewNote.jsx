import { useState } from "react";
import EditNoteContent from "./EditNoteContent";

function NewNote() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };
  
  return (
    <div
      className={
        `bg-zinc-800 outline outline-1 outline-zinc-500 rounded-lg w-full max-w-[600px] mb-[18px] shadow-lg shadow-zinc-900/80`
      }
      onClick={handleClick}
    >
      {isOpen ? (
        <EditNoteContent />
      ) : (
        <article className={`p-4 p${isOpen ? 'pb-10' : ''} overflow-auto`}>
          <header>
            <h2 className="text-zinc-300 font-medium text-md cursor-text">Create a task...</h2>
          </header>
        </article>
      )}
    </div>
  );
}

export default NewNote;
