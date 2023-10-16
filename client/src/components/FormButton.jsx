import { Link } from "react-router-dom";

function FormButton({ children, color = "gray", ...attributes }) {
  const colorVariants = {
    gray: 'bg-gray-500 hover:bg-gray-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    red: 'bg-red-500 hover:bg-red-600',
  }
  const className = `${colorVariants[color]} text-white px-4 py-2 rounded-md ${
    attributes.className || ""
  }`;
  const ButtonTag = attributes.to ? Link : "button";

  return (
    <ButtonTag {...attributes} className={className}>
      {children}
    </ButtonTag>
  );
}

export default FormButton;
