import React from "react";

export default function VideoPlayer({ stream }) {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <div className="relative m-2 flex min-h-24 min-w-24 justify-center overflow-hidden rounded-xl border-2 border-slate-600">
      <video className="z-20" ref={videoRef} autoPlay />
      <h1 className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-white">
        Loading...
      </h1>
    </div>
  );
}
