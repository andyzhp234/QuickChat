import React from "react";
import FullScreenIcon from "../../assets/icon-full-screen.png";
import VideoPlayer from "./VideoPlayer";

export default function MinimizedWindow({ setMinimizeScreen, stream }) {
  return (
    <div className="fixed z-40 w-52 rounded-br-lg bg-black p-1">
      <div className="flex w-full justify-end">
        <img
          className="h-7 w-7 cursor-pointer"
          src={FullScreenIcon}
          alt="fullscreen Button"
          onClick={() => setMinimizeScreen(false)}
        />
      </div>
      <VideoPlayer stream={stream} />
    </div>
  );
}
