import { Link } from "react-router-dom";

function FormButton({ children, color = "gray", ...attributes }) {
  const className = `bg-${color}-500 hover:bg-${color}-600 text-white px-4 py-2 rounded-md ${
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
