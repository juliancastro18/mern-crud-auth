import { useState, useRef, useEffect } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import EditCardContent from "./EditNoteContent";

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
      }, 150);
    }
  }, [isClosing]);

  const handleClick = (e) => {
    if (e.target.dataset?.element === "background") {
      cardRef.current.style.top =
      cardRef.current.offsetTop - cardRef.current.clientHeight * 0.35 + "px";
      setIsClosing(true);
    } else if (!isEdit) {
      cardRef.current.style.top =
        cardRef.current.offsetTop - window.scrollY + "px";
      const { offsetTop, clientHeight } = cardRef.current;
      setPreviousProps({ offsetTop, clientHeight });
      setIsEdit(true);
    }
  };

  const className = isEdit
    ? "fixed z-30 shadow-md shadow-black/40"
    : "hover:shadow-md hover:shadow-zinc-900/80 hover:duration-100";

  return (
    <>
      <div
        className={`bg-zinc-800 outline outline-1 outline-zinc-500 rounded-lg w-full max-w-[600px] transition-all duration-100 ease-in-out ${className}`}
        ref={cardRef}
        style={
          isClosing
            ? {
                top: previousProps.offsetTop - window.scrollY + "px"
              }
            : isEdit
            ? { top: "35%", transform: "translate(0, -35%)" }
            : {}
        }
        onClick={handleClick}
      >
        {isEdit ? (
          <EditCardContent task={task} />
        ) : (
          <article className="p-4 pb-10 overflow-auto">
            <header className="pb-4">
              <h2 className="text-md font-semibold">{task.title}</h2>
            </header>
            <div className="text-zinc-300 pb-4">
              <LinesEllipsis
                text={task.description}
                maxLine="10"
                ellipsis="..."
                trimRight
                basedOn="words"
              />
            </div>
          </article>
        )}
      </div>
      {isEdit && (
        <>
          <div style={{ height: previousProps.clientHeight }}></div>
          <div
            data-element="background"
            className="bg-zinc-900/60 fixed inset-0 w-full h-full z-10"
            onClick={handleClick}
          ></div>
        </>
      )}
    </>
  );
}

export default TaskCard;
