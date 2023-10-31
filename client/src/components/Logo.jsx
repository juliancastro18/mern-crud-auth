import React from "react";
import logo from "../assets/kip_logo.png";

function Logo() {
  return (
    <div className="flex items-center select-none">
      <img src={logo} width="44" height="40" alt="Kip Logo" className="p-0.5" />
      <h1 className="text-2xl px-1 font-normal text-zinc-200">Kip</h1>
    </div>
  );
}

export default Logo;
