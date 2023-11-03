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

  const ref = useRef();
  const isMounted = useRef(false);
  const dirtyFieldsRef = useRef();
  dirtyFieldsRef.current = dirtyFields;

  useOutsideClick(ref, handleClickOutside);

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

  return (
    <article className="p-4 pb-10 overflow-auto max-h-[85vh]" ref={ref}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("title")}
          id={"title"}
          className="text-xl font-medium pb-4 block w-full bg-inherit focus:outline-none"
          placeholder="Title"
          autoComplete="off"
        />
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          {...register("description")}
          id={"description"}
          className="text-zinc-300 pb-4 block w-full bg-inherit focus:outline-none"
          placeholder={task ? "Description" : "Create a note..."}
          autoComplete="off"
          autoFocus
        />
        <label htmlFor="description" className="sr-only">
          Description
        </label>
      </form>
      {task !== null && (
        <div className="text-right text-sm text-zinc-400">
          Last modified:{" "}
          <ReactTimeAgo date={Date.parse(task.updatedAt)} locale="en-US" />
        </div>
      )}
    </article>
  );
}

export default EditNoteContent;
