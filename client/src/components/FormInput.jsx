import React from "react";

function FormInput({ type, register, placeholder, autofocus = false, errors }) {
  return (
    <>
      <input
        type={type}
        {...register}
        placeholder={placeholder}
        autoFocus={autofocus}
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
      />
      {errors && <p className="text-red-500">{placeholder} is required.</p>}
    </>
  );
}

export default FormInput;