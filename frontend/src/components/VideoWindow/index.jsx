import React, { useContext } from "react";
import MinimizedWindow from "./MinimizedWindow";
import FullScreenWindow from "./FullScreenWindow";
import { socket } from "../../socketClient/socketConnection";
import VideoContext from "../../context/VideoContext";

export default function VideoWindow() {
  const {
    conversationId,
    minimizeScreen,
    localStream,
    remoteStream,
    videoOn,
    audioOn,
    setMinimizeScreen,
    toggleCamera,
    toggleMic,
    hangupVideoCall,
    createOffer,
    shareScreen,
    isSharingScreen,
  } = useContext(VideoContext);

  // Get the local stream first.
  // Then sends signal Messages (offer) to all participants of current conversations
  React.useEffect(() => {
    socket.emit("join-video-room", { conversationId: conversationId }, () => {
      createOffer();
    });
  }, []);

  return minimizeScreen ? (
    <MinimizedWindow
      stream={localStream}
      setMinimizeScreen={setMinimizeScreen}
    />
  ) : (
    <FullScreenWindow
      stream={localStream}
      remoteStream={remoteStream}
      videoOn={videoOn}
      audioOn={audioOn}
      setMinimizeScreen={setMinimizeScreen}
      toggleCamera={toggleCamera}
      toggleMic={toggleMic}
      hangupVideoCall={hangupVideoCall}
      shareScreen={shareScreen}
      isSharingScreen={isSharingScreen}
    />
  );
}
