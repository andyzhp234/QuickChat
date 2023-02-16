import React from "react";

export default function HorizontalDivider({ text }) {
  return (
    <div className="flex items-center">
      <hr className="mr-4 inline-block flex-1 border-t border-gray-300 align-middle" />
      <h2 className="text-sm text-gray-500">{text}</h2>
      <hr className="ml-4 inline-block flex-1 border-t border-gray-300 align-middle" />
    </div>
  );
}
