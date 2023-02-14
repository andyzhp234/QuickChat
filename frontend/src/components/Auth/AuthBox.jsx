import React from "react";
import BrandLogo from "../../assets/brand-logo.png";
import { useNavigate } from "react-router-dom";

export default function AuthBox({ children }) {
  const navigate = useNavigate();
  return (
    <div className="shadow-4D flex w-full justify-center overflow-hidden lg:w-60rem lg:rounded-xl lg:border">
      <img
        className="w-18 absolute top-3 left-3 h-8 cursor-pointer"
        src={BrandLogo}
        alt="brand-logo"
        onClick={() => navigate("/")}
      />
      <div className="items flex h-screen w-full max-w-lg flex-col justify-center p-7 lg:h-fit lg:w-1/2 lg:p-24">
        {children}
      </div>
      <div className="hidden flex-col items-center justify-center bg-[url('../assets/bg-snowy-mint.jpg')] bg-cover p-10 lg:flex  lg:w-1/2">
        <h1 className="my-2 text-4xl font-semibold">
          Connect with ease, Chat with confidence
        </h1>
        <h2 className="my-2 w-full text-slate-500">
          Stay connected, never miss a beat.
        </h2>
      </div>
    </div>
  );
}
