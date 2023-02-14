import React from "react";
import { useDispatch } from "react-redux";
import { setVideoCalling } from "../../store/slices/chatSlice";
import ShareScreenIcon from "../../assets/icon-share-screen.png";
import MicroPhoneIcon from "../../assets/icon-microphone.png";
import HangupIcon from "../../assets/icon-hangup.png";
import ShareVideoIcon from "../../assets/icon-video-call-white.png";

export default function VideoControls({
  stream,
  audioOn,
  videoOn,
  toggleCamera,
  toggleMic,
  hangupVideoCall,
  shareScreen,
  isSharingScreen,
}) {
  const dispatch = useDispatch();

  async function hangUpVideoWindowHandler() {
    hangupVideoCall();
    dispatch(
      setVideoCalling({
        isCalling: false,
        videoConversationId: null,
      })
    );
  }

  return (
    <div className="flex h-20 w-full items-center justify-center">
      <img
        className={`m-2 h-12 w-12 cursor-pointer rounded-full ${
          isSharingScreen ? "bg-red-500" : "bg-green-500"
        } p-2`}
        src={ShareScreenIcon}
        onClick={shareScreen}
      />
      <img
        className={`m-2 h-12 w-12 cursor-pointer rounded-full ${
          audioOn ? "bg-green-500" : "bg-red-500"
        } p-2`}
        src={MicroPhoneIcon}
        onClick={toggleMic}
      />
      <img
        className={`m-2 h-12 w-12 cursor-pointer rounded-full ${
          videoOn ? "bg-green-500" : "bg-red-500"
        } p-2`}
        src={ShareVideoIcon}
        onClick={toggleCamera}
      />
      <img
        className="m-2 h-12 w-12 cursor-pointer rounded-full bg-red-500 p-2"
        src={HangupIcon}
        onClick={() => hangUpVideoWindowHandler()}
      />
    </div>
  );
}
