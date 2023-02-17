import React from "react";

export default function VideoPlayer({ stream, isRemote = false }) {
  const videoRef = React.useRef(null);

  const videoOn = stream
    ?.getTracks()
    .find((track) => track.kind === "video").enabled;

  React.useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <div className="relative m-2 flex min-h-24 min-w-24 justify-center overflow-hidden rounded-xl border-2 border-slate-600">
      <video className="z-20" ref={videoRef} autoPlay />

      {stream ? (
        !videoOn ? (
          <div className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-white">
            Video Off
          </div>
        ) : null
      ) : (
        <div className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-white">
          Loading...
        </div>
      )}
    </div>
  );
}
