import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNotes } from "../../context/NoteContext";
import { dirtyValues, isFormDataEmpty } from "../../helpers/main";
import ReactTimeAgo from "react-time-ago";
import useOutsideClick from "../../hooks/useOutsideClick";
import useResizeTextarea from "../../hooks/useResizeTextarea";

function EditNoteContent({ note = null, input = null, handleClickOutside }) {
  const { createNote, updateNote } = useNotes();
  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: {
      title: note?.title,
      description: note?.description || input,
    },
  });

  const isMounted = useRef(false);
  const articleRef = useRef();
  const { ref: descFormRef, ...descRegister } = register("description");
  const descCustomRef = useResizeTextarea();
  const dirtyFieldsRef = useRef();
  dirtyFieldsRef.current = dirtyFields;

  useOutsideClick(articleRef, handleClickOutside);

  const onSubmit = (data) => {
    if (!note && isFormDataEmpty(data)) {
      return;
    }
    if (note) {
      const payload = dirtyValues(dirtyFieldsRef.current, data);
      if (!payload || Object.keys(payload).length === 0) {
        return;
      }
      updateNote(note._id, payload);
    } else {
      createNote(data);
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return () => handleSubmit(onSubmit)();
    }
  }, []);

  return (
    <article className="px-4 pt-4 overflow-auto max-h-[85vh]" ref={articleRef}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("title")}
          id={"title"}
          className="text-lg font-medium pb-4 block w-full bg-inherit focus:outline-none placeholder-zinc-400"
          placeholder="Title"
          autoComplete="off"
        />
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <textarea
          {...descRegister}
          ref={(e) => {
            descFormRef(e);
            descCustomRef.current = e;
          }}
          id={"description"}
          className="text-zinc-300 block w-full h-auto bg-inherit resize-none focus:outline-none placeholder-zinc-400"
          placeholder={note ? "Description" : "Create a note..."}
          autoComplete="off"
          autoFocus
        ></textarea>
        <label htmlFor="description" className="sr-only">
          Description
        </label>
      </form>
      {note && (
        <div className="text-right text-sm text-zinc-400 pt-4 pb-2">
          Last modified:{" "}
          <ReactTimeAgo date={Date.parse(note.updatedAt)} locale="en-US" />
        </div>
      )}
    </article>
  );
}

export default EditNoteContent;
