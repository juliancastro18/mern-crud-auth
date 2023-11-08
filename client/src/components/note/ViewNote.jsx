import { useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import Highlighter from "react-highlight-words";
import EditNoteContent from "./EditNoteContent";
import { Transition } from "@headlessui/react";
import Toolbar from "./Toolbar";
import useFixComponent from "../../hooks/useFixComponent";

function NoteCard({ note, searchTerms = [] }) {
  const {
    ref: cardRef,
    isState,
    stateValues,
    style: cardStyle,
    handleClickInside,
    handleClickOutside,
    closedProps,
  } = useFixComponent();
  const [description, setDescription] = useState("");

  const handleReflow = (rleState) => {
    const { clamped, text } = rleState;
    setDescription(text + (clamped ? "..." : ""));
  };

  const className = !isState(stateValues.closed)
    ? "fixed z-30 shadow-[0_2px_6px_3px_rgba(0,0,0,0.4)]"
    : "hover:shadow-md hover:shadow-zinc-900/80 hover:duration-100";

  return (
    <>
      <div
        className={`bg-zinc-800 outline outline-1 outline-zinc-500 rounded-lg w-full max-w-[600px] group transition-all duration-150 ease-in-out ${className}`}
        ref={cardRef}
        style={cardStyle}
        onClick={handleClickInside}
      >
        {isState(stateValues.editing) ? (
          <EditNoteContent
            note={note}
            handleClickOutside={handleClickOutside}
          />
        ) : (
          <article className="p-4 overflow-auto">
            {note.title.length > 0 && (
              <header className="pb-4">
                <Highlighter
                  className="text-md font-medium"
                  highlightClassName="bg-yellow-300"
                  searchWords={searchTerms}
                  autoEscape={true}
                  textToHighlight={note.title}
                />
              </header>
            )}
            {note.description.length > 0 && (
              <div className="text-zinc-300 text-md whitespace-pre-wrap relative">
                <LinesEllipsis
                  className="invisible absolute"
                  onReflow={handleReflow}
                  text={note.description}
                  maxLine="10"
                  ellipsis="..."
                  trimRight
                  basedOn="words"
                />
                <Highlighter
                  className=""
                  highlightClassName="bg-yellow-300"
                  searchWords={searchTerms}
                  autoEscape={true}
                  textToHighlight={description}
                />
              </div>
            )}
            {note.title.length + note.description.length === 0 && (
              <h2 className="text-xl font-normal text-zinc-400">Empty note</h2>
            )}
          </article>
        )}
        <Toolbar
          isOpen={isState(stateValues.editing)}
          noteId={note._id}
          handleClose={handleClickOutside}
        />
      </div>
      {!isState(stateValues.closed) && (
        <div style={{ height: closedProps.clientHeight }}></div>
      )}
      <Transition
        className="fixed z-20"
        show={isState(stateValues.editing)}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="bg-zinc-900/60 fixed inset-0 w-full h-full"></div>
      </Transition>
    </>
  );
}

export default NoteCard;
