import React from "react";

export default function LoadingModal() {
  return (
    <div className="absolute z-40 flex h-full w-full items-center justify-center bg-gray-600 bg-opacity-40">
      <div className="h-14 w-14 animate-spin rounded-full border-[5px] border-current border-green-500 border-t-transparent"></div>
    </div>
  );
}
