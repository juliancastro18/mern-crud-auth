import { Link } from "react-router-dom";

function FormButton({ children, color = "yellow", ...attributes }) {
  const colorVariants = {
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
    gray: 'bg-gray-500 hover:bg-gray-600',
    red: 'bg-red-500 hover:bg-red-600',
  }
  const className = `${colorVariants[color]} font-medium text-zinc-900 px-4 py-2 rounded-md ${
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
