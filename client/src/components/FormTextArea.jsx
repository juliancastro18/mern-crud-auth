import React from "react";

function FormTextArea({ rows = "3", register, placeholder, autofocus = false, errors }) {
  return (
    <>
      <textarea
        rows={rows}
        {...register}
        placeholder={placeholder}
        autoFocus={autofocus}
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
      ></textarea>
      {errors && <p className="text-red-500">{placeholder} is required.</p>}
    </>
  );
}

export default FormTextArea;
