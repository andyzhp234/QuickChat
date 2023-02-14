import React from "react";

export default function ModalBody({ children }) {
  return (
    <div className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50 p-2">
      {children}
    </div>
  );
}
