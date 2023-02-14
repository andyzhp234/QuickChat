import React from "react";

export default function WelcomeMessage() {
  return (
    <div className="flex h-full flex-1 flex-col items-center bg-white p-5">
      <h1 className="text-gradient mt-80 text-6xl font-semibold lg:text-8xl">
        Welcome!
      </h1>
      <h2 className="mt-5 text-center font-semibold">
        Connect with your friends and groups instantly. Just click on their name
        to start chatting.
      </h2>
    </div>
  );
}
