import React from "react";

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function FormInput({ type, register, autofocus = false, errors, rows = "3", InputType = "input" }) {
  const title = capitalizeFirstLetter(register.name);

  let attributes = {};
  if (InputType === "input") {
    attributes.type = type;
  } else if (InputType === "textarea") {
    attributes.rows = rows;
  }

  return (
    <>
      <label htmlFor={register.name}>{title}</label>
      <InputType
        {...attributes}
        {...register}
        placeholder={title}
        autoFocus={autofocus}
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
      />
      {errors && <p className="text-red-500">{title} is required.</p>}
    </>
  );
}

export default FormInput;
