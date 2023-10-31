import { useState, useRef } from "react";
import { useTasks } from "../context/TaskContext";
import FormButton from "./FormButton";

// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";
// dayjs.extend(utc);

function TaskCard({ task }) {
  const [isEdit, setIsEdit] = useState(false);
  const cardRef = useRef();
  const { deleteTask } = useTasks();

  // const cardHeight = cardRef?.current.clientHeight;
  const handleClick = (e) => {
    console.log(cardRef.current.offsetTop - (cardRef.current.clientHeight * 0.35));
    if (e.target.dataset?.element === "background") {
      setIsEdit(false);
    } else if (!isEdit) {
      cardRef.current.style.top = (cardRef.current.offsetTop - window.scrollY) + 'px';
      setIsEdit(true);
    }
  };
  const className = isEdit
    ? "fixed z-20 shadow-md shadow-black/40"
    : "hover:shadow-md hover:shadow-zinc-900/80 hover:duration-100";

  return (
    <>
      <div
        className={`transition-all duration-150 ease-in-out bg-zinc-800 outline outline-1 outline-zinc-500 rounded-lg w-full max-w-[600px] ${className}`}
        style={
          isEdit
            ? {
              top: "35%",
              transform: "translate(0, -35%)"
              }
            : {
            }
        }
        ref={cardRef}
        onClick={handleClick}
      >
        <article
          className={`p-4 pb-10 overflow-auto ${isEdit ? "max-h-[85vh]" : ""}`}
        >
          <header className="flex justify-between">
            <h2 className="text-md font-semibold">{task.title}</h2>
            <div className="flex gap-x-2 items-center">
              <FormButton
                color="red"
                onClick={() => {
                  deleteTask(task._id);
                }}
              >
                Delete
              </FormButton>
              <FormButton to={`/tasks/${task._id}`} color="gray">
                Edit
              </FormButton>
            </div>
          </header>
          <p className="text-slate-300">{task.description}</p>
          {/* <p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p> */}
        </article>
      </div>
      {isEdit && (
        <>
          <div
            style={{ height: cardRef?.current.clientHeight ?? 0}}
          ></div>
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
