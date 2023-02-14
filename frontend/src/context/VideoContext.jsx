import React from "react";
import { createContext } from "react";
import { useSelector } from "react-redux";
import { socket } from "../socketClient/socketConnection";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  // for a p2p 1v1 video calling, only one peerConnectionObject is enough.
  const localStreamRef = React.useRef(null);
  const [peerConnection, setPeerConnection] = React.useState(null);
  const [localStream, setLocalStream] = React.useState(null);
  const [remoteStream, setRemoteStream] = React.useState(null);
  const [isSharingScreen, setIsSharingScreen] = React.useState(false);
  const [videoOn, setVideoOn] = React.useState(false);
  const [audioOn, setAudioOn] = React.useState(false);
  const [minimizeScreen, setMinimizeScreen] = React.useState(false);
  const conversationId = useSelector(
    (state) => state.chatRoom.chosenChatDetails.conversationId
  );

  React.useEffect(() => {
    socket.on("send-rtc-offer", (data) => {
      createAnswer(data);
    });
    socket.on("send-rtc-answer", (data) => {
      addAnswer(data);
    });
    socket.on("send-ice-candidate", (data) => {
      if (
        peerConnection &&
        peerConnection.remoteDescription &&
        peerConnection.signalingState !== "closed"
      ) {
        peerConnection.addIceCandidate(data.candidate);
      }
    });
    socket.on("user-leave", () => {
      if (peerConnection) {
        peerConnection.close();
        setRemoteStream(null);
      }
    });
    return () => {
      socket.off("send-rtc-offer");
      socket.off("send-rtc-answer");
      socket.off("send-ice-candidate");
    };
  }, [peerConnection]);

  function toggleCamera() {
    let videoTrack = localStream
      .getTracks()
      .find((track) => track.kind === "video");
    if (videoTrack.enabled) {
      setVideoOn(false);
      videoTrack.enabled = false;
    } else {
      setVideoOn(true);
      videoTrack.enabled = true;
    }
  }

  function toggleMic() {
    let audioTrack = localStream
      .getTracks()
      .find((track) => track.kind === "audio");
    if (audioTrack.enabled) {
      setAudioOn(false);
      audioTrack.enabled = false;
    } else {
      setAudioOn(true);
      audioTrack.enabled = true;
    }
  }

  function shareScreen() {
    if (isSharingScreen) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true,
        })
        .then((stream) => {
          let videoTrack = stream
            .getTracks()
            .find((track) => track.kind === "video");
          peerConnection
            .getSenders()
            .find((sender) => sender.track.kind === "video")
            .replaceTrack(videoTrack)
            .catch((err) => console.error(err));

          localStream.getTracks().forEach((track) => track.stop());
          setLocalStream(stream);
          setIsSharingScreen(false);
        });
    } else {
      navigator.mediaDevices
        .getDisplayMedia({
          audio: false,
          video: true,
        })
        .then((stream) => {
          let videoTrack = stream
            .getTracks()
            .find((track) => track.kind === "video");

          peerConnection
            .getSenders()
            .find((sender) => sender.track.kind === "video")
            .replaceTrack(videoTrack)
            .catch((err) => console.error(err));

          localStream.getTracks().forEach((track) => track.stop());
          setLocalStream(stream);
          setIsSharingScreen(true);
        });
    }
  }

  function hangupVideoCall() {
    localStream.getTracks().forEach((track) => track.stop());
    socket.emit("leave-video-room", {
      conversationId: conversationId,
    });
    setLocalStream(null);
    setRemoteStream(null);
    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
    }
  }

  const servers = {
    iceServers: [
      {
        urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"],
      },
    ],
  };

  let createPeerConnection = async () => {
    let newPeerConnection = new RTCPeerConnection(servers);
    let newLocalStream = null;

    // if we don't have localStream, get it
    if (!localStream) {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      newLocalStream = stream;
      setLocalStream(stream);
    } else {
      newLocalStream = localStream;
    }

    // when we generated an Ice candidates, we need to send it to the receiver.
    newPeerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        socket.emit("send-ice-candidate", {
          candidate: event.candidate,
          conversationId: conversationId,
        });
      }
    };

    // add local Streams to Peer Connection
    newLocalStream.getTracks().forEach((track) => {
      if (track.kind === "audio" || track.kind === "video") {
        track.enabled = false;
      }
      newPeerConnection.addTrack(track, newLocalStream);
    });

    // when received remote stream, add it locally
    newPeerConnection.ontrack = (event) => {
      let newRemoteStream = new MediaStream();
      event.streams[0].getTracks().forEach((track) => {
        newRemoteStream.addTrack(track);
      });
      setRemoteStream(newRemoteStream);
    };
    return newPeerConnection;
  };

  localStreamRef.current = createPeerConnection;

  // this function is called when the user is the initiator
  let createOffer = async () => {
    // create the peerConnection Object
    let pc = await localStreamRef.current();
    // let pc = await createPeerConnection();
    let offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    setPeerConnection(pc);

    // broadcast this SDP offer to everyone in the conversation Room
    // Of course in 1v1 chatroom, only 1 peer will receive this offer.
    socket.emit("send-rtc-offer", { conversationId, offer });
  };

  // this function is called by the receiver.
  // when I received an offer, I will create an Answer;
  let createAnswer = async (data) => {
    let { senderSocketId, offer } = data;
    if (senderSocketId === socket.id) return;

    // let pc = await createPeerConnection();
    let pc = await localStreamRef.current();
    await pc.setRemoteDescription(offer);
    let answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    setPeerConnection(pc);

    // socket send this SDP answer back to who ever sends this
    socket.emit("send-rtc-answer", { targetSocketId: senderSocketId, answer });
  };

  // this function is called when the initiator's offer got an answer
  let addAnswer = async (data) => {
    let { answer } = data;
    if (!peerConnection.currentRemoteDescription) {
      peerConnection.setRemoteDescription(answer);
    }
  };

  let contextData = {
    peerConnection,
    conversationId,
    localStream,
    remoteStream,
    minimizeScreen,
    isSharingScreen,
    videoOn,
    audioOn,
    setMinimizeScreen,
    toggleCamera,
    toggleMic,
    hangupVideoCall,
    createOffer,
    shareScreen,
  };

  return (
    <VideoContext.Provider value={contextData}>
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContext;
