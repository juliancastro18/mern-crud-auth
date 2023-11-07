function ToolbarButton({ children, name, onClick, ...attributes }) {
  const handleOnClick = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div className="group/btn relative rounded-full mx-2">
      <span className='rounded hidden group-hover/btn:block select-none text-sm font-normal px-1.5 py-0.5 bg-zinc-700/90 text-zinc-300 mt-9 absolute text-center left-1/2 -translate-x-1/2'>{name}</span>
      <button
        className="h-[34px] w-[34px] p-2 rounded-full hover:bg-opacity-10 hover:bg-zinc-100"
        onClick={handleOnClick}
        {...attributes}
      >
        {children}
      </button>
    </div>
  );
}

export default ToolbarButton;
