import React from "react";
import { useNavigate } from "react-router-dom";

export default function PolicyNav({ isLogin = false }) {
  const navigate = useNavigate();
  function navTOS() {
    navigate("/legal");
  }
  function navPrivacyPolicy() {
    navigate("/privacy");
  }

  return (
    <div className="mt-7 text-sm">
      By {isLogin ? "Logging into QuickChat" : "Signing up for QuickChat"} you
      agree to our{" "}
      <span className="cursor-pointer text-blue-600" onClick={navTOS}>
        Terms of Services
      </span>{" "}
      and{" "}
      <span className="cursor-pointer text-blue-600" onClick={navPrivacyPolicy}>
        Privacy Policy.
      </span>
    </div>
  );
}
