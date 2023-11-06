import { useState, useRef, useEffect } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import EditNoteContent from "./EditNoteContent";
import { Transition } from "@headlessui/react";
import Toolbar from "./Toolbar";

function TaskCard({ task }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [previousProps, setPreviousProps] = useState({
    offsetTop: 0,
    height: 0,
  });

  const cardRef = useRef();

  useEffect(() => {
    if (isClosing) {
      setTimeout(() => {
        setIsClosing(false);
        setIsEdit(false);
      }, 200);
    }
  }, [isClosing]);

  const handleClickInside = (e) => {
    e.stopPropagation();
    if (!isEdit) {
      cardRef.current.style.top =
        cardRef.current.offsetTop - window.scrollY + "px";
      const { offsetTop, clientHeight } = cardRef.current;
      setPreviousProps({ offsetTop, clientHeight });
      setIsEdit(true);
    }
  };

  const handleClickOutside = () => {
    cardRef.current.style.top =
      cardRef.current.offsetTop - cardRef.current.clientHeight * 0.35 + "px";
    setIsClosing(true);
  };

  const className = isEdit
    ? "fixed z-30 shadow-md shadow-black/40"
    : "hover:shadow-md hover:shadow-zinc-900/80 hover:duration-100";

  return (
    <>
      <div
        className={`bg-zinc-800 outline outline-1 outline-zinc-500 rounded-lg w-full max-w-[600px] group transition-all duration-150 ease-in-out ${className}`}
        ref={cardRef}
        style={
          isClosing
            ? {
                top: previousProps.offsetTop - window.scrollY + "px",
              }
            : isEdit
            ? { top: "35%", transform: "translate(0, -35%)" }
            : {}
        }
        onClick={handleClickInside}
      >
        {isEdit ? (
          <EditNoteContent
            task={task}
            handleClickOutside={handleClickOutside}
          />
        ) : (
          <article className="p-4 overflow-auto">
            {task.title.length > 0 && (
              <header className="pb-4">
                <h2 className="text-md font-medium">{task.title}</h2>
              </header>
            )}
            {task.description.length > 0 && (
              <div className="text-zinc-300 text-md whitespace-pre-wrap">
                <LinesEllipsis
                  text={task.description}
                  maxLine="10"
                  ellipsis="..."
                  trimRight
                  basedOn="words"
                />
              </div>
            )}
            {task.title.length + task.description.length === 0 && (
              <h2 className="text-xl font-normal text-zinc-400">Empty note</h2>
            )}
          </article>
        )}
        <Toolbar
          isOpen={isEdit}
          taskId={task._id}
          handleClose={handleClickOutside}
        />
      </div>
      {isEdit && <div style={{ height: previousProps.clientHeight }}></div>}
      <Transition
        className="fixed"
        show={isEdit && !isClosing}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="bg-zinc-900/60 fixed inset-0 w-full h-full z-10"></div>
      </Transition>
    </>
  );
}

export default TaskCard;
