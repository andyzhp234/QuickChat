import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen items-center justify-center  bg-[url('../assets/bg-snowy-mint.jpg')] bg-cover">
      <div className="flex w-30rem flex-col items-center text-center">
        <h1 className="text-7xl font-semibold">
          <span className="landing-text-gradient">Chat</span> Anytime, Anywhere
        </h1>
        <h2 className="mt-8 text-gray-700">
          Say goodbye to the hassle of setting up complicated video calls and
          struggling with unreliable messaging apps.
        </h2>
        <div
          className="mt-8 cursor-pointer rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-white hover:bg-emerald-500"
          onClick={() => navigate("/login")}
        >
          Get Started
        </div>
      </div>
    </div>
  );
}
