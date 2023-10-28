import React from "react";
import Logo from "./Logo";

function MainForm({ children, title }) {
  return (
    <div className="flex h-[90vh] items-center justify-center">
      <div className="border border-zinc-400 max-w-md w-full p-10 pb-12 rounded-lg">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <h1 className="text-lg font-normal mb-4">{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default MainForm;
