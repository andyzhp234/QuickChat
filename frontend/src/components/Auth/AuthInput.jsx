import React from "react";

export default function AuthInput({ label, type, value, change }) {
  return (
    <div className="w-full py-2">
      <h2 className="py-2 text-sm font-medium text-black">{label}</h2>
      <input
        className="h-12 w-full rounded-2xl border-2 border-gray-200 pl-2 lg:h-10"
        type={type}
        value={value}
        onChange={change}
        required
      />
    </div>
  );
}
