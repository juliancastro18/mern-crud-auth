import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../../context/TaskContext";
import { dirtyValues } from "../../helpers/main";
import ReactTimeAgo from "react-time-ago";

function EditNoteContent({ task = null }) {
  const { createTask, updateTask } = useTasks();
  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: { title: task?.title, description: task?.description },
  });

  const isMounted = useRef(false);
  const dirtyFieldsRef = useRef();
  dirtyFieldsRef.current = dirtyFields;

  const onSubmit = (id = null, data) => {
    if (!data || Object.keys(data).length === 0) {
      return;
    }
    if (id) {
      updateTask(id, data);
    } else {
      createTask(data);
    }
  };

  const onClose = () => {
    if (task === null) {
      handleSubmit(onSubmit)();
    } else {
      handleSubmit((data) => {
        onSubmit(task._id, dirtyValues(dirtyFieldsRef.current, data));
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
    <article className="p-4 pb-10 overflow-auto max-h-[85vh]" >
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("title")}
          id={"title"}
          className="text-md font-semibold pb-4 block w-full bg-inherit focus:outline-none"
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
