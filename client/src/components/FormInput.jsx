import React from "react";

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function FormInput({
  type,
  register,
  autofocus = false,
  errors,
  rows = "3",
  InputType = "input",
  className
}) {
  const title = capitalizeFirstLetter(register.name);

  let attributes = {};
  if (InputType === "input") {
    attributes.type = type;
  } else if (InputType === "textarea") {
    attributes.rows = rows;
  }

  return (
    <div className={className}>
      <div className="relative">
        <InputType
          {...attributes}
          {...register}
          autoFocus={autofocus}
          id={register.name}
          className="block px-2.5 pb-2.5 pt-4 w-full text-md text-zinc-100 bg-transparent rounded-lg border border-zinc-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          for={register.name}
          className="absolute text-md text-zinc-400 bg-zinc-800 duration-300 transform -translate-y-4 scale-75 top-1.5 z-10 origin-[0] px-2 cursor-text peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          {title}
        </label>
      </div>
      {errors && <p className="text-red-500 pt-1 text-sm">{title} is required</p>}
    </div>
  );
}

export default FormInput;
