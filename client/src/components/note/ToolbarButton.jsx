function ToolbarButton({ children, onClick, ...attributes }) {

  const handleOnClick = (e) => {
    e.stopPropagation();
    onClick();
  }

  return (
    <button
      className="h-[34px] w-[34px] p-1.5 rounded-full mx-2 hover:bg-opacity-10 hover:bg-zinc-100"
      onClick={handleOnClick}
      {...attributes}
    >
      {children}
    </button>
  );
}

export default ToolbarButton;
