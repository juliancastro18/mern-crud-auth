import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../../context/TaskContext";
import { dirtyValues, isFormDataEmpty } from "../../helpers/main";
import ReactTimeAgo from "react-time-ago";
import useOutsideClick from "../../hooks/useOutsideClick";

function EditNoteContent({ task = null, input = null, handleClickOutside }) {
  const { createTask, updateTask } = useTasks();
  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: {
      title: task?.title,
      description: task?.description || input,
    },
  });

  const articleRef = useRef();
  const { ref: descriptionFormRef, ...descriptionRegister } =
    register("description");
  const descriptionCustomRef = useRef(null);
  const isMounted = useRef(false);
  const dirtyFieldsRef = useRef();
  dirtyFieldsRef.current = dirtyFields;

  useOutsideClick(articleRef, handleClickOutside);

  const onSubmit = (data, id = null) => {
    if (!id && isFormDataEmpty(data)) {
      return;
    }
    if (id) {
      const payload = dirtyValues(dirtyFieldsRef.current, data);
      if (!payload || Object.keys(payload).length === 0) {
        return;
      }
      updateTask(id, payload);
    } else {
      createTask(data);
    }
  };

  const onClose = () => {
    if (task === null) {
      handleSubmit(onSubmit)();
    } else {
      handleSubmit((data) => {
        onSubmit(data, task._id);
      })();
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return onClose;
    }
  }, []);

  useEffect(() => {
    const autoResize = () => {
      if (descriptionCustomRef.current) {
        descriptionCustomRef.current.style.height = "auto";
        descriptionCustomRef.current.style.height =
          descriptionCustomRef.current.scrollHeight + "px";
      }
    };
    autoResize();
    descriptionCustomRef.current.addEventListener("input", autoResize, false);
  }, []);

  return (
    <article className="px-4 pt-4 overflow-auto max-h-[85vh]" ref={articleRef}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("title")}
          id={"title"}
          className="text-lg font-medium pb-4 block w-full bg-inherit focus:outline-none"
          placeholder="Title"
          autoComplete="off"
        />
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <textarea
          {...descriptionRegister}
          ref={(e) => {
            descriptionFormRef(e);
            descriptionCustomRef.current = e;
          }}
          id={"description"}
          className="text-zinc-300 block w-full h-auto bg-inherit resize-none focus:outline-none"
          placeholder={task ? "Description" : "Create a note..."}
          autoComplete="off"
          autoFocus
        ></textarea>
        <label htmlFor="description" className="sr-only">
          Description
        </label>
      </form>
      {task && (
        <div className="text-right text-sm text-zinc-400 pt-4 pb-2">
          Last modified:{" "}
          <ReactTimeAgo date={Date.parse(task.updatedAt)} locale="en-US" />
        </div>
      )}
    </article>
  );
}

export default EditNoteContent;
