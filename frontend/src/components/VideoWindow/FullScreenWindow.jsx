import React from "react";
import VideoPlayer from "./VideoPlayer";
import VideoControls from "./VideoControls";
import MinimizeScreenButton from "../Buttons/MinimizeScreenButton";

export default function FullScreenWindow({
  stream,
  remoteStream,
  videoOn,
  audioOn,
  toggleCamera,
  toggleMic,
  setMinimizeScreen,
  VideoOptionsHandler,
  hangupVideoCall,
  shareScreen,
  isSharingScreen,
}) {
  return (
    <div className="absolute z-40 flex h-full w-full  flex-col bg-black p-5">
      <MinimizeScreenButton setMinimizeScreen={setMinimizeScreen} />
      <div className="relative flex h-full w-full flex-col overflow-y-hidden">
        <div className="antiscroll-inner relative flex h-full w-full flex-wrap items-center justify-center overflow-y-auto">
          <VideoPlayer stream={stream} />
          {remoteStream ? (
            <VideoPlayer stream={remoteStream} isRemote={true} />
          ) : null}
        </div>
        <VideoControls
          stream={stream}
          videoOn={videoOn}
          audioOn={audioOn}
          toggleCamera={toggleCamera}
          toggleMic={toggleMic}
          VideoOptionsHandler={VideoOptionsHandler}
          hangupVideoCall={hangupVideoCall}
          shareScreen={shareScreen}
          isSharingScreen={isSharingScreen}
        />
      </div>
    </div>
  );
}
