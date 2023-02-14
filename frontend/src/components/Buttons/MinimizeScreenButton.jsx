import React from "react";
import MinimizeScreenIcon from "../../assets/icon-minimize-screen.png";

export default function MinimizeScreenButton({ setMinimizeScreen }) {
  return (
    <div className="flex w-full justify-end">
      <img
        className="h-8 w-8 cursor-pointer"
        src={MinimizeScreenIcon}
        alt="fullscreen Button"
        onClick={() => setMinimizeScreen(true)}
      />
    </div>
  );
}
